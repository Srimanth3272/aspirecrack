const express = require('express');
const path = require('path');
const cron = require('node-cron');
const fs = require('fs');
const { updateCurrentAffairs } = require('./updater');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require('nodemailer');
require('dotenv').config();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || ''
  }
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Fix for the PDF with spaces in the URL
app.get('/formula book to crack maths.pdf', (req, res) => {
  res.redirect('/formula_book_to_crack_maths.pdf');
});

// ── IN-MEMORY CACHE FOR HIGH CONCURRENCY ────────────────────
let cachedData = null;

function loadDataToCache() {
  try {
    const dataPath = path.join(__dirname, 'latest_data.json');
    if (fs.existsSync(dataPath)) {
      cachedData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      console.log('✅ Data loaded into memory cache.');
    } else {
      console.log('⚠️ No latest_data.json found on startup.');
    }
  } catch (err) {
    console.error('Error loading data to cache:', err);
  }
}

// Initial load on server start
loadDataToCache();

// ── MONGODB & USER SCHEMA ───────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/AspireCrack';
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_AspireCrack';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Database'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  isSubscribed: { type: Boolean, default: false },
  subscriptionExpiry: { type: Date, default: null },
  subscriptionPlan: { type: String, default: null },
  resetToken: String,
  resetTokenExpiry: Date,
  isGoogleUser: { type: Boolean, default: false }
});
const User = mongoose.model('User', userSchema);

// ── RAZORPAY CONFIGURATION & PLANS ──────────────────────────
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy_key_123',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret_123'
});

const SUBSCRIPTION_PLANS = {
  '3_months': {
    id: '3_months',
    name: '3 Months Pass',
    price: 79,
    amount: 7900, // ₹79 in paise
    durationDays: 90,
    description: 'AspireCrack — 3 Months Access (₹79)'
  },
  '6_months': {
    id: '6_months',
    name: '6 Months Pass',
    price: 149,
    amount: 14900, // ₹149 in paise
    durationDays: 180,
    description: 'AspireCrack — 6 Months Access (₹149)'
  },
  '1_year': {
    id: '1_year',
    name: '1 Year Full Combo Pass (All Subjects: Maths, Reasoning, English & Shortcuts)',
    price: 299,
    amount: 29900, // ₹299 in paise
    durationDays: 365,
    description: 'AspireCrack — 1 Year Full Master Combo (All Subjects Covered) (₹299)'
  }
};

// ── AUTHENTICATION ROUTES ───────────────────────────────────
app.get('/api/config', (req, res) => {
  res.json({ googleClientId: process.env.GOOGLE_CLIENT_ID });
});

app.post('/api/google-auth', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const email = payload['email'];

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, isGoogleUser: true });
      await user.save();
    }

    let subStatus = user.isSubscribed;
    if (user.email === 'sreemanthnagalakunta@gmail.com') {
      subStatus = true;
    } else if (subStatus && user.subscriptionExpiry < new Date()) {
      user.isSubscribed = false;
      await user.save();
      subStatus = false;
    }

    const jwtToken = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
    res.json({ success: true, token: jwtToken, isSubscribed: user.isSubscribed });
  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(401).json({ error: 'Invalid Google Token' });
  }
});

app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'AspireCrack Password Reset',
      text: `You requested a password reset.\n\nPlease copy this token to reset your password:\n\n${resetToken}\n\nIf you did not request this, please ignore this email.`
    };

    if (process.env.EMAIL_USER && process.env.EMAIL_USER.includes('@')) {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: `Password reset link sent to ${email}` });
    } else {
      console.log('--- MOCK EMAIL SEND (Update .env EMAIL_USER to send real emails) ---');
      console.log(mailOptions);
      res.json({ success: true, message: `(Mock Mode) Reset token generated for ${email}. Check server logs.` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process forgot password' });
  }
});
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ error: 'Email already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
    res.json({ success: true, token, isSubscribed: user.isSubscribed });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Check if subscription expired
    let subStatus = user.isSubscribed;
    if (user.email === 'sreemanthnagalakunta@gmail.com') {
      subStatus = true;
    } else if (subStatus && user.subscriptionExpiry < new Date()) {
      user.isSubscribed = false;
      await user.save();
      subStatus = false;
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
    res.json({ success: true, token, isSubscribed: subStatus });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── MIDDLEWARE TO VERIFY TOKEN ──────────────────────────────
const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return next(); // Guest user

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      req.userEmail = user.email;
      if (user.email === 'sreemanthnagalakunta@gmail.com') {
        req.isSubscribed = true;
      } else if (user.isSubscribed && user.subscriptionExpiry > new Date()) {
        req.isSubscribed = true;
      } else if (user.isSubscribed && user.subscriptionExpiry < new Date()) {
        user.isSubscribed = false;
        await user.save();
        req.isSubscribed = false;
      }
    }
  } catch (err) {
    // Invalid token, treat as guest
  }
  next();
};

// ── SUBSCRIPTION / PAYMENT ROUTES ───────────────────────────
app.get('/api/razorpay-key', (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
});

app.get('/api/plans', (req, res) => {
  res.json(SUBSCRIPTION_PLANS);
});

app.post('/api/create-order', async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = SUBSCRIPTION_PLANS[planId] || SUBSCRIPTION_PLANS['3_months'];

    const options = {
      amount: plan.amount, // in paise
      currency: 'INR',
      receipt: `receipt_${plan.id}_${Date.now()}`,
      notes: {
        planId: plan.id,
        planName: plan.name,
        batch: plan.id === '1_year' ? 'All-Subjects Full Combo Batch' : 'Regular'
      }
    };
    const order = await razorpay.orders.create(options);
    res.json({ ...order, plan });
  } catch (err) {
    console.error('Razorpay order creation error:', err);
    res.status(500).json({ error: 'Error creating Razorpay order' });
  }
});

app.post('/api/verify-payment', verifyToken, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email, planId } = req.body;
    
    // Verify signature
    const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret_123';
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification failed: Invalid signature' });
    }
    
    const plan = SUBSCRIPTION_PLANS[planId] || SUBSCRIPTION_PLANS['3_months'];
    const durationDays = plan.durationDays || 90;

    // Calculate dynamic subscription expiry
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + durationDays);
    
    const userEmail = req.userEmail || email;
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { 
        isSubscribed: true, 
        subscriptionExpiry: expiry,
        subscriptionPlan: plan.id
      },
      { new: true }
    );
    
    if (user) {
      res.json({ 
        success: true, 
        message: `Payment successful! ${plan.name} unlocked until ${expiry.toLocaleDateString('en-IN')}.`,
        plan: plan.id,
        subscriptionExpiry: expiry
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Razorpay verification error:', err);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// ── GET LATEST DATA ENDPOINT ────────────────────────────────
app.get('/api/latest-data', verifyToken, (req, res) => {
  const isSub = req.isSubscribed ? true : false;
  if (cachedData) {
    if (isSub) {
      // Premium User: Gets all data
      res.json({ ...cachedData, isSubscribed: true });
    } else {
      // Free User: Gets only ticker and 2 topics. Rest is blocked.
      const freemiumData = {
        ...cachedData,
        topicCards: cachedData.topicCards.slice(0, 2), // Only 2 free topics
        mcqData: [], // No MCQs for free users
        isSubscribed: false
      };
      res.json(freemiumData);
    }
  } else {
    // If not in cache, fallback to reading file or return error
    try {
      const dataPath = path.join(__dirname, 'latest_data.json');
      if (fs.existsSync(dataPath)) {
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        cachedData = data;
        
        if (isSub) {
          res.json({ ...data, isSubscribed: true });
        } else {
          res.json({
            ...data,
            topicCards: data.topicCards.slice(0, 2),
            mcqData: [],
            isSubscribed: false
          });
        }
      } else {
        res.status(404).json({ error: 'Latest data file not found.' });
      }
    } catch (err) {
      console.error('Error reading latest_data.json:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// ── FORCE UPDATE ENDPOINT ──────────────────────────────────
let isUpdating = false;
app.post('/api/force-update', async (req, res) => {
  if (isUpdating) {
    console.log('⚠️ Force update requested but an update is already in progress. Throttling request.');
    return res.status(429).json({ success: false, error: 'An AI update is already in progress. Please wait a few seconds...' });
  }

  isUpdating = true;
  console.log('🔄 Force update requested via API...');
  const success = await updateCurrentAffairs();
  isUpdating = false;

  if (success) {
    // Refresh the in-memory cache with the new data
    loadDataToCache();
    res.json({ success: true, message: 'Current affairs updated successfully!' });
  } else {
    res.status(500).json({ success: false, error: 'Failed to update current affairs. Please check API quota or logs.' });
  }
});

// ── SCHEDULED CRON JOB (DAILY AT 7:00 AM) ──────────────────
cron.schedule('0 7 * * *', async () => {
  console.log('⏰ [Cron Job] Executing scheduled daily update at 07:00 AM...');
  const success = await updateCurrentAffairs();
  if (success) {
    // Refresh the cache automatically after the daily update
    loadDataToCache();
  }
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});

app.listen(PORT, () => {
  console.log(`🚀 AspireCrack Automated Server running on http://localhost:${PORT}`);
  console.log(`⏰ Daily auto-update cron scheduled for 07:00 AM (Asia/Kolkata)`);
});




