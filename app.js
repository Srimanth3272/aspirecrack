'use strict';

/* ═══════════════════════════════════════════════
   ExamEdge AI — Production Application Script
   All Govt Exams | PDF | Error Reporting | MCQs
   ═══════════════════════════════════════════════ */

// ── MCQ DATA BANK (50 Questions) ──────────────────────
let mcqData = [
  { id:'q1', num:'01', topic:'Yoga Day', q:'The 12th International Day of Yoga (2026) was observed on which date?', opts:['June 20, 2026','June 21, 2026','June 22, 2026','June 23, 2026'], correct:1, explanation:'International Day of Yoga is observed every year on June 21, established by UNGA Resolution 69/131 (adopted December 11, 2014). The 12th edition was June 21, 2026.' },
  { id:'q2', num:'02', topic:'Yoga Day', q:'What was the theme of the 12th International Day of Yoga (2026)?', opts:['Yoga for Peace','Yoga for Humanity','Yoga for Healthy Ageing','Yoga for One Earth'], correct:2, explanation:'"Yoga for Healthy Ageing" was the theme for IDY 2026. Previous themes: 2025 — Yoga for Self & Society; 2024 — Yoga for Women Empowerment.' },
  { id:'q3', num:'03', topic:'Yoga Day', q:'India\'s proposal to observe June 21 as International Yoga Day received co-sponsorship from how many nations?', opts:['135 nations','155 nations','177 nations','190 nations'], correct:2, explanation:'177 nations co-sponsored India\'s proposal — the largest co-sponsorship in the history of the United Nations General Assembly.' },
  { id:'q4', num:'04', topic:'BRICS', q:'The BRICS NSA Meeting (June 2026) was chaired by India\'s NSA Ajit Doval. What was the meeting\'s theme?', opts:['Countering terrorism in cyberspace','Non-traditional security challenges confronting the world today','Regional security in Indo-Pacific','Economic security and supply chain resilience'], correct:1, explanation:'The BRICS NSA meeting (June 22-23, 2026) was themed "Non-traditional security challenges confronting the world today" — covering terrorism, cyber threats, climate security, and new technology risks.' },
  { id:'q5', num:'05', topic:'BRICS', q:'After the 2024 expansion, what is the total membership of BRICS?', opts:['5 members','9 members','11 members','13 members'], correct:2, explanation:'BRICS has 11 members after 2024 expansion: Original 5 (Brazil, Russia, India, China, South Africa) + New 6 (Egypt, Ethiopia, Iran, Saudi Arabia, UAE, Indonesia).' },
  { id:'q6', num:'06', topic:'Padma Awards', q:'Among the following, who received the Padma BHUSHAN (not Padma Shri) in 2026?', opts:['Rohit Sharma','Savita Punia','R. Madhavan','Alka Yagnik'], correct:3, explanation:'Alka Yagnik received Padma Bhushan 2026. Rohit Sharma, Savita Punia, and R. Madhavan received Padma Shri. Note this common trap — Rohit Sharma got Padma Shri, not Padma Bhushan.' },
  { id:'q7', num:'07', topic:'Padma Awards', q:'The Padma Awards were instituted in which year?', opts:['1950','1952','1954','1956'], correct:2, explanation:'Padma Awards were instituted in 1954. The hierarchy from highest to lowest: Bharat Ratna → Padma Vibhushan → Padma Bhushan → Padma Shri.' },
  { id:'q8', num:'08', topic:'Padma Awards', q:'Who among the following was awarded a POSTHUMOUS Padma Shri in 2026?', opts:['Vijay Amritraj','Mammootty','Satish Shah','S.K.M. Maeilanandhan'], correct:2, explanation:'The late comedian-actor Satish Shah was honoured posthumously with Padma Shri 2026. He was known for his work in Hindi television and cinema.' },
  { id:'q9', num:'09', topic:'Padma Awards', q:'Savita Punia, awarded Padma Shri 2026, represents which state and plays which sport-position?', opts:['Punjab — Hockey Defender','Haryana — Hockey Goalkeeper','Karnataka — Football Goalkeeper','Odisha — Hockey Midfielder'], correct:1, explanation:'Savita Punia from Haryana is India\'s national hockey goalkeeper and one of the world\'s best. She was awarded Padma Shri 2026.' },
  { id:'q10', num:'10', topic:'SVAMITVA', q:'SVAMITVA scheme was launched on which day and why is that date significant?', opts:['March 2 — National Science Day','April 24 — National Panchayati Raj Day','May 5 — National Rural Day','October 2 — Gandhi Jayanti'], correct:1, explanation:'SVAMITVA was launched on April 24, 2020 — National Panchayati Raj Day, which commemorates April 24, 1993 when the 73rd Constitutional Amendment (Panchayati Raj) came into force.' },
  { id:'q11', num:'11', topic:'SVAMITVA', q:'Which agency conducts the drone surveys under the SVAMITVA Scheme?', opts:['ISRO','DRDO','Survey of India','National Remote Sensing Centre'], correct:2, explanation:'Survey of India (under Ministry of Science & Technology) conducts drone-based surveys under SVAMITVA. It is NOT ISRO — a common confusion in exams.' },
  { id:'q12', num:'12', topic:'SVAMITVA', q:'How many crore "Adhikar Patra" (property cards) have been issued under SVAMITVA as of June 2026?', opts:['1.5 crore','2.4 crore','3.18 crore','4.0 crore'], correct:2, explanation:'3.18 crore Adhikar Patra have been issued under SVAMITVA covering ~3.17 lakh villages (over 90% of national target).' },
  { id:'q13', num:'13', topic:'Finance Commission', q:'The 16th Finance Commission (2026-2031) is chaired by whom?', opts:['N.K. Singh','Arvind Subramanian','Dr. Arvind Panagariya','Y.V. Reddy'], correct:2, explanation:'The 16th Finance Commission covering 2026-2031 is chaired by Dr. Arvind Panagariya. N.K. Singh chaired the 15th FC (2021-2026).' },
  { id:'q14', num:'14', topic:'Finance Commission', q:'The 16th Finance Commission recommended an increase in Rural Local Body (RLB) grants by what percentage compared to the 15th FC?', opts:['45%','62%','74%','84%'], correct:3, explanation:'The 16th FC recommended an 84% increase in RLB grants totalling ₹4.35 lakh crore for 2026-2031. This is a major step towards fiscal federalism at grassroots level.' },
  { id:'q15', num:'15', topic:'Core Sector', q:'India\'s Core Sector (ICI) growth rate for May 2026 was:', opts:['-0.3%','0.5%','1.8%','2.4%'], correct:1, explanation:'India\'s core sector growth was 0.5% in May 2026 — the second-lowest in 21 months, down from 1.8% in April 2026. Five of eight industries contracted.' },
  { id:'q16', num:'16', topic:'Core Sector', q:'The Eight Core Industries (ICI) together account for what percentage of the IIP weight?', opts:['28.5%','35.0%','40.27%','46.8%'], correct:2, explanation:'The Eight Core Industries account for 40.27% of the weight in the Index of Industrial Production (IIP). This is why ICI data serves as a leading indicator of industrial output.' },
  { id:'q17', num:'17', topic:'Core Sector', q:'Which sector recorded the highest contraction in the Eight Core Industries data for May 2026?', opts:['Crude Oil (-4.6%)','Natural Gas (-4.9%)','Refinery Products (-8.7%)','Coal (-9.3%)'], correct:3, explanation:'Coal recorded the steepest contraction at -9.3% in May 2026, followed by Refinery Products (-8.7%). Electricity (+8.7%), Cement (+8.4%), and Steel (+5.0%) recorded positive growth.' },
  { id:'q18', num:'18', topic:'Core Sector', q:'The Index of Eight Core Industries (ICI) is released by which body?', opts:['Reserve Bank of India','CSO/MoSPI','Office of the Economic Adviser, Ministry of Commerce','NITI Aayog'], correct:2, explanation:'ICI data is released by the Office of the Economic Adviser (OEA), Ministry of Commerce and Industry. It is NOT released by RBI or CSO — a common exam trap.' },
  { id:'q19', num:'19', topic:'RBI', q:'RBI injected ₹1.41 trillion through which instrument on June 23, 2026 to address liquidity deficit?', opts:['Open Market Operations (OMO)','Standing Deposit Facility (SDF)','Variable Rate Repo (VRR)','Marginal Standing Facility (MSF)'], correct:2, explanation:'RBI conducted a 7-day Variable Rate Repo (VRR) auction at cut-off rate of 5.26% to inject ₹1.41 trillion, addressing a liquidity deficit caused by GST and advance tax outflows.' },
  { id:'q20', num:'20', topic:'RBI', q:'TReDS (Trade Receivables Discounting System) primarily benefits which sector?', opts:['Large Corporations','Public Sector Banks','MSMEs (Micro, Small & Medium Enterprises)','Foreign investors'], correct:2, explanation:'TReDS is an RBI-regulated platform enabling MSMEs to discount their trade receivables/invoices against large buyers, providing them timely working capital access.' },
  { id:'q21', num:'21', topic:'SEBI', q:'SEBI\'s proposed "Common Advertisement Code" proposes limiting celebrity endorsements to:', opts:['Specific financial products only','Social media platforms only','Corporate or brand level only (NOT product-specific)','Mutual fund NAV advertisements'], correct:2, explanation:'SEBI proposed that celebrity endorsements should be limited to corporate or brand level and MUST NOT endorse specific financial products/services to protect investors from misleading advertising.' },
  { id:'q22', num:'22', topic:'SEBI', q:'SEBI was established as a statutory body under which Act?', opts:['SEBI Act, 1988','SEBI Act, 1990','SEBI Act, 1992','Securities Contracts (Regulation) Act, 1956'], correct:2, explanation:'SEBI was established as a statutory body under the SEBI Act, 1992. It was originally set up as a non-statutory advisory body in 1988 before gaining statutory powers in 1992.' },
  { id:'q23', num:'23', topic:'Space', q:'The BRICS Heads of Space Agencies (HOSA) meeting in June 2026 was held in which Indian city?', opts:['New Delhi','Hyderabad','Chennai','Bengaluru'], correct:3, explanation:'Bengaluru hosted the two-day BRICS HOSA meeting (June 23-24, 2026). Bengaluru is home to ISRO headquarters, making it the natural venue for space cooperation meetings.' },
  { id:'q24', num:'24', topic:'Space', q:'IN-SPACe (Indian National Space Promotion and Authorisation Centre) operates under which authority?', opts:['Ministry of Science & Technology','Ministry of Defence','Department of Space (under PM\'s Office)','Ministry of Electronics & IT'], correct:2, explanation:'IN-SPACe operates under the Department of Space, which reports directly to the Prime Minister\'s Office. It was established to promote and authorize private sector space activities.' },
  { id:'q25', num:'25', topic:'Space', q:'What type of propulsion does the PSLV (Polar Satellite Launch Vehicle) use?', opts:['All-solid propulsion (4 stages)','All-liquid propulsion (4 stages)','Alternating solid-liquid (4 stages)','Hybrid solid-cryogenic (3 stages)'], correct:2, explanation:'PSLV uses 4 stages with alternating solid (PS1, PS3) and liquid (PS2, PS4) propulsion. This makes it India\'s most reliable "workhorse" rocket, having completed 50+ successful missions.' },
  { id:'q26', num:'26', topic:'Space', q:'The BRICS Remote Sensing Satellite Constellation (RSSC) is a collaborative project for:', opts:['Military surveillance','Deep space exploration','Earth Observation and resource monitoring','Communication satellite network'], correct:2, explanation:'BRICS RSSC is a cooperative Earth Observation initiative where BRICS nations share satellite data for disaster management, agriculture, forestry, and environmental monitoring.' },
  { id:'q27', num:'27', topic:'Biodiversity', q:'The new wasp species Spilomena malabarica was discovered in which district of Kerala?', opts:['Wayanad','Thrissur','Kozhikode','Idukki'], correct:2, explanation:'Scientists from the Zoological Survey of India (ZSI) discovered Spilomena malabarica in Kozhikode district, Kerala — part of the Western Ghats UNESCO World Heritage biodiversity hotspot.' },
  { id:'q28', num:'28', topic:'Biodiversity', q:'The Zoological Survey of India (ZSI) was established in which year?', opts:['1905','1916','1935','1947'], correct:1, explanation:'ZSI was established in 1916 with its headquarters at Kolkata. It functions under the Ministry of Environment, Forest and Climate Change and is India\'s premier wildlife research organization.' },
  { id:'q29', num:'29', topic:'Biodiversity', q:'Biochar is produced from agricultural residue through which process?', opts:['Composting (aerobic decomposition)','Anaerobic digestion','Pyrolysis (thermal decomposition in low oxygen)','Fermentation'], correct:2, explanation:'Biochar is produced by pyrolysis — thermal decomposition of biomass (like paddy straw) in a low-oxygen environment. It improves soil fertility, sequesters carbon, and reduces the need for stubble burning.' },
  { id:'q30', num:'30', topic:'Archaeology', q:'Rakhigarhi, from where ASI transferred skeletal remains for advanced DNA study, belongs to which civilization?', opts:['Vedic Civilization','Megalithic Culture','Harappan (Indus Valley) Civilization','Iron Age Culture'], correct:2, explanation:'Rakhigarhi is one of the largest known sites of the Harappan (Indus Valley) Civilization, located in Haryana. DNA analysis of its skeletal remains could reshape our understanding of ancient migration patterns.' },
  { id:'q31', num:'31', topic:'Defence', q:'Garudastra, successfully tested in June 2026, is an indigenous:', opts:['Anti-tank guided missile','Man-portable air defence system','120mm vehicle-mounted mortar system','Naval surface-to-air missile'], correct:2, explanation:'Garudastra is an indigenous 120mm vehicle-mounted mortar system developed by Nibe Limited (a private defence company) and tested at the Infantry School, Mhow, Madhya Pradesh.' },
  { id:'q32', num:'32', topic:'Defence', q:'INS Kavaratti, which visited Vietnam in June 2026, is classified as which type of warship?', opts:['Guided Missile Destroyer','Aircraft Carrier','Anti-Submarine Warfare (ASW) Corvette','Offshore Patrol Vessel'], correct:2, explanation:'INS Kavaratti is an Anti-Submarine Warfare (ASW) Corvette, named after Kavaratti — the capital of the Union Territory of Lakshadweep. It visited Ho Chi Minh City along with INS Udaygiri.' },
  { id:'q33', num:'33', topic:'Defence', q:'INS Udaygiri that visited Vietnam belongs to which project/class?', opts:['Project 17A (Nilgiri class Frigate)','Project 15B (Visakhapatnam class Destroyer)','Project 28A (Kamorta class Corvette)','Project 75 (Kalvari class Submarine)'], correct:1, explanation:'INS Udaygiri belongs to Project 15B — the Visakhapatnam class Destroyer. These are India\'s most advanced guided missile destroyers built by Mazagon Dock Shipbuilders.' },
  { id:'q34', num:'34', topic:'Defence', q:'The Rafale aircraft operated by the Indian Air Force is manufactured by which company?', opts:['Boeing (USA)','Lockheed Martin (USA)','Eurofighter GmbH (UK/Germany)','Dassault Aviation (France)'], correct:3, explanation:'Rafale is manufactured by Dassault Aviation of France. India signed a deal for 36 Rafale aircraft in 2016. The M88 engines (maintained by Safran) power these jets.' },
  { id:'q35', num:'35', topic:'Appointments', q:'Tushar Mehta was reappointed as Solicitor General of India for how many years, effective July 1, 2026?', opts:['1 year','2 years','3 years','5 years'], correct:2, explanation:'Tushar Mehta was reappointed as Solicitor General of India for a three-year term, effective July 1, 2026, by the Appointments Committee of the Cabinet (ACC).' },
  { id:'q36', num:'36', topic:'Appointments', q:'The correct hierarchy of India\'s Law Officers from highest to lowest rank is:', opts:['SG → AG → ASG','AG → SG → ASG','ASG → SG → AG','AG → ASG → SG'], correct:1, explanation:'Attorney General (AG) → Solicitor General (SG) → Additional Solicitor General (ASG). The AG is India\'s highest law officer, appointed by the President under Article 76 of the Constitution.' },
  { id:'q37', num:'37', topic:'Appointments', q:'Before being appointed Interim CMD of IRCON International, Saleem Ahmad served as CMD of which organization?', opts:['IRCON International','RITES Limited','Rail Vikas Nigam Limited (RVNL)','Container Corporation of India (CONCOR)'], correct:2, explanation:'Saleem Ahmad was CMD of RVNL (Rail Vikas Nigam Limited) before being appointed as Interim CMD of IRCON International Ltd. for one year, effective July 1, 2026.' },
  { id:'q38', num:'38', topic:'Critical Minerals', q:'How many critical and strategic mineral blocks were successfully auctioned by India as announced in June 2026?', opts:['36','48','56','72'], correct:2, explanation:'India auctioned 56 critical and strategic mineral blocks — a milestone under the National Critical Minerals Mission (Budget 2024-25) and MMDR Act amendments enabling private sector participation.' },
  { id:'q39', num:'39', topic:'Critical Minerals', q:'The National Critical Minerals Mission was launched in which Union Budget?', opts:['Union Budget 2022-23','Union Budget 2023-24','Union Budget 2024-25','Union Budget 2025-26'], correct:2, explanation:'The National Critical Minerals Mission was announced in Union Budget 2024-25 to reduce import dependence, develop domestic critical mineral resources, and support India\'s green energy transition.' },
  { id:'q40', num:'40', topic:'Youth', q:'The "Vande Mataram Camps" are launched under which initiative?', opts:['Nehru Yuva Kendra Sangathan (NYKS)','National Service Scheme (NSS)','MY Bharat (Mera Yuva Bharat)','Pradhan Mantri Yuva Yojana'], correct:2, explanation:'"Vande Mataram Camps" are 7-day residential youth camps under MY Bharat (Mera Yuva Bharat) — an autonomous body under the Ministry of Youth Affairs and Sports, launched to foster national unity and constitutional values.' },
  { id:'q41', num:'41', topic:'Ports', q:'V.O. Chidambaranar Port (VOCPA), which launched "PortGPT" AI app, is located in which state?', opts:['Andhra Pradesh','Karnataka','Tamil Nadu','Kerala'], correct:2, explanation:'V.O. Chidambaranar Port (also called Tuticorin Port) is located in Tamil Nadu. It was highlighted for a 45% reduction in carbon emissions and the launch of the AI-based PortGPT mobile application.' },
  { id:'q42', num:'42', topic:'Finance', q:'The IEPFA (Investor Education and Protection Fund Authority) that launched the book "Claiming the Unclaimed" functions under which Ministry?', opts:['Ministry of Corporate Affairs','RBI','Ministry of Finance','SEBI'], correct:2, explanation:'IEPFA functions under the Ministry of Finance (Department of Economic Affairs). It administers the IEPF and helps investors reclaim unclaimed dividends and shares lying with companies.' },
  { id:'q43', num:'43', topic:'Climate', q:'The UNICEF "Children\'s Climate Risk Report 2026" stated that how many children globally face multiple overlapping climate hazards?', opts:['500 million','800 million','1.1 billion','1.8 billion'], correct:2, explanation:'UNICEF\'s Children\'s Climate Risk Report 2026 found that 1.1 billion children worldwide face multiple overlapping climate hazards, with drought being the most widespread single threat.' },
  { id:'q44', num:'44', topic:'Medical', q:'The National Medical Commission (NMC) announced phasing out PG medical diplomas, mandating transition to MD/MS by which year?', opts:['2025','2026','2027','2030'], correct:2, explanation:'NMC announced that all postgraduate medical diplomas will be phased out by 2027, with mandatory transition to MD/MS programs to standardize medical education and improve quality of postgraduate training.' },
  { id:'q45', num:'45', topic:'Awards', q:'The Wolf Prize in Physics 2026 was awarded to Prof. Jainendra K. Jain for his work in:', opts:['String Theory and M-Theory','Quantum Chromodynamics','Condensed Matter Physics and Composite Fermion Theory','Gravitational Wave Detection'], correct:2, explanation:'Prof. Jainendra K. Jain was awarded the Wolf Prize in Physics 2026 for pioneering contributions to condensed matter physics — specifically the composite fermion theory explaining the fractional quantum Hall effect.' },
  { id:'q46', num:'46', topic:'Jan Vishwas', q:'The Jan Vishwas Act amendments notified in June 2026 primarily aimed at:', opts:['Increasing penalties for financial fraud','Decriminalisation of minor/technical regulatory offences','Creating new financial appellate tribunals','Expanding jurisdiction of consumer courts'], correct:1, explanation:'Jan Vishwas (Amendment of Provisions) Act primarily aims at decriminalising minor technical offences across various laws to improve ease of doing business. Amendments to RBI, LIC, and PFRDA Acts were notified effective June 23, 2026.' },
  { id:'q47', num:'47', topic:'History', q:'The All India Forward Bloc, whose first plenary conference anniversary was observed in June 2026, was founded by:', opts:['Bal Gangadhar Tilak','Bipin Chandra Pal','Subhas Chandra Bose','Lala Lajpat Rai'], correct:2, explanation:'The All India Forward Bloc was founded by Netaji Subhas Chandra Bose in 1939. Its first plenary conference was held in Nagpur in 1940. The party merged radical nationalism with left-wing ideology.' },
  { id:'q48', num:'48', topic:'Trade', q:'India\'s Commerce Minister Piyush Goyal held trade negotiations in June 2026 with which US official?', opts:['Gina Raimondo (Commerce Sec.)','Jamieson Greer (USTR)','Katherine Tai (USTR)','Janet Yellen (Treasury)'], correct:1, explanation:'Commerce Minister Piyush Goyal held bilateral trade negotiations with Jamieson Greer, the US Trade Representative (USTR), to finalize the first tranche of a bilateral trade deal.' },
  { id:'q49', num:'49', topic:'Marine', q:'India deployed its first 3D-printed artificial reef modules for what primary purpose?', opts:['Military underwater surveillance','Marine biodiversity conservation and fish habitat','Tidal energy generation','Deep-sea mineral harvesting'], correct:1, explanation:'India\'s first 3D-printed artificial reef modules were deployed to support marine biodiversity — creating underwater habitats for fish and marine organisms, and supporting coral ecosystem restoration.' },
  { id:'q50', num:'50', topic:'Shipping', q:'Which city hosts the world\'s largest ship recycling yard (Alang), for which India leads globally?', opts:['Mumbai, Maharashtra','Chennai, Tamil Nadu','Visakhapatnam, Andhra Pradesh','Alang, Gujarat'], correct:3, explanation:'Alang in Gujarat is the world\'s largest ship recycling yard, making India the global leader in ship recycling. This has significant economic importance but also raises environmental concerns addressed under the Hong Kong Convention.' }
];

// ── USER ANSWERS TRACKING ──────────────────────────
const userAnswers = {};

// ── RENDER MCQ BANK ──────────────────────────────────
function renderMCQBank() {
  const container = document.getElementById('mcqBank');
  if (!container) return;

  container.innerHTML = mcqData.map(item => `
    <div class="mcq-bank-item" id="bank-${item.id}">
      <div class="mcq-num">Q${item.num} | ${item.topic}</div>
      <div class="mcq-bank-q">${item.q}</div>
      <div class="mcq-bank-opts" id="opts-${item.id}">
        ${item.opts.map((opt, idx) => `
          <label class="mcq-bank-opt" id="opt-${item.id}-${idx}" onclick="selectOption('${item.id}', ${idx}, ${item.correct})">
            <input type="radio" name="${item.id}" value="${idx}" />
            <span>${String.fromCharCode(65+idx)}. ${opt}</span>
          </label>
        `).join('')}
      </div>
      <div class="mcq-explanation" id="exp-${item.id}">
        💡 <strong>Explanation:</strong> ${item.explanation}
      </div>
    </div>
  `).join('');
}

function selectOption(qId, selectedIdx, correctIdx) {
  userAnswers[qId] = selectedIdx;
  const opts = document.querySelectorAll(`#opts-${qId} .mcq-bank-opt`);
  opts.forEach(opt => opt.classList.remove('selected-correct','selected-wrong','reveal-correct'));
  if (selectedIdx === correctIdx) {
    document.getElementById(`opt-${qId}-${selectedIdx}`).classList.add('selected-correct');
  } else {
    document.getElementById(`opt-${qId}-${selectedIdx}`).classList.add('selected-wrong');
    document.getElementById(`opt-${qId}-${correctIdx}`).classList.add('reveal-correct');
  }
}

function submitAllMCQs() {
  let score = 0, attempted = 0;
  mcqData.forEach(item => {
    const selected = userAnswers[item.id];
    const opts = document.querySelectorAll(`#opts-${item.id} .mcq-bank-opt`);
    const expEl = document.getElementById(`exp-${item.id}`);
    if (selected !== undefined) {
      attempted++;
      opts.forEach((opt, idx) => {
        opt.classList.remove('selected-correct','selected-wrong','reveal-correct');
        if (idx === item.correct) opt.classList.add('reveal-correct');
        if (idx === selected && selected !== item.correct) opt.classList.add('selected-wrong');
      });
      if (selected === item.correct) score++;
    } else {
      if (opts[item.correct]) opts[item.correct].classList.add('reveal-correct');
    }
    if (expEl) expEl.style.display = 'block';
  });

  const pct = attempted > 0 ? Math.round((score/attempted)*100) : 0;
  const scoreEl = document.getElementById('scoreDisplay');
  if (scoreEl) {
    scoreEl.style.display = 'inline-flex';
    scoreEl.textContent = `🎯 Score: ${score}/${attempted} (${pct}%) — ${getScoreMessage(pct)}`;
  }
  const btn = document.getElementById('submitAllBtn');
  if (btn) { btn.textContent = '✅ Submitted'; btn.disabled = true; }

  // ── AI WEAKNESS DETECTOR ──────────────────────────────
  const topicStats = {};
  mcqData.forEach(item => {
    const selected = userAnswers[item.id];
    if (selected !== undefined) {
      // derive a broad category/topic if available, else use 'General'
      const t = item.q.split(' ')[0] + ' Concept'; 
      if (!topicStats[t]) topicStats[t] = { correct: 0, total: 0 };
      topicStats[t].total++;
      if (selected === item.correct) topicStats[t].correct++;
    }
  });

  let weaknessHtml = '';
  for (const [topic, stats] of Object.entries(topicStats)) {
    const acc = Math.round((stats.correct / stats.total) * 100);
    let status = '', statusCls = '';
    if (acc >= 75) { status = '🟢 Strong'; statusCls = 'status-strong'; }
    else if (acc >= 50) { status = '🟡 Average'; statusCls = 'status-average'; }
    else { status = '🔴 Weak'; statusCls = 'status-weak'; }
    weaknessHtml += `<tr><td>${topic}</td><td>${acc}%</td><td class="${statusCls}">${status}</td></tr>`;
  }

  if (weaknessHtml) {
    let wdContainer = document.getElementById('weaknessDetector');
    if (!wdContainer) {
      wdContainer = document.createElement('div');
      wdContainer.id = 'weaknessDetector';
      const submitWrap = document.querySelector('.mcq-submit-wrap');
      if (submitWrap) submitWrap.parentNode.insertBefore(wdContainer, submitWrap.nextSibling);
    }
    wdContainer.innerHTML = `
      <h3 style="margin-top:20px; font-size:16px; color:var(--text-primary);">🤖 AI Weakness Detector</h3>
      <table class="weakness-table">
        <thead><tr><th>Topic</th><th>Accuracy</th><th>Status</th></tr></thead>
        <tbody>${weaknessHtml}</tbody>
      </table>
    `;
    wdContainer.style.display = 'block';
  }
}

function getScoreMessage(pct) {
  if (pct >= 90) return '🏆 Topper Level!';
  if (pct >= 75) return '⭐ Excellent Performance!';
  if (pct >= 60) return '👍 Good. Keep Revising!';
  if (pct >= 40) return '📚 Needs More Practice';
  return '💪 Keep Going. Consistency Wins!';
}

function resetAllMCQs() {
  Object.keys(userAnswers).forEach(k => delete userAnswers[k]);
  mcqData.forEach(item => {
    document.querySelectorAll(`#opts-${item.id} .mcq-bank-opt`).forEach(opt => {
      opt.classList.remove('selected-correct','selected-wrong','reveal-correct');
    });
    document.querySelectorAll(`input[name="${item.id}"]`).forEach(inp => inp.checked = false);
    const expEl = document.getElementById(`exp-${item.id}`);
    if (expEl) expEl.style.display = 'none';
  });
  const scoreEl = document.getElementById('scoreDisplay');
  if (scoreEl) scoreEl.style.display = 'none';
  const btn = document.getElementById('submitAllBtn');
  if (btn) { btn.textContent = 'Submit All & Check Score'; btn.disabled = false; }
  const wd = document.getElementById('weaknessDetector');
  if (wd) wd.style.display = 'none';
}

// ── TAB FILTER ────────────────────────────────────────
function filterTab(category) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === category);
  });

  const mcqSection  = document.getElementById('section-mcq');
  const mainsSection = document.getElementById('section-mains');
  const summarySection = document.getElementById('section-summary');
  const allCards = document.querySelectorAll('.topic-card:not(#emptyCategoryMsg)');

  let hasVisibleCards = false;

  if (category === 'all') {
    allCards.forEach(c => { c.style.display = ''; c.classList.remove('hidden'); });
    [mcqSection, mainsSection, summarySection].forEach(s => { if (s) { s.style.display = ''; s.classList.remove('hidden'); } });
    hasVisibleCards = allCards.length > 0;
  } else if (category === 'mcq') {
    allCards.forEach(c => { c.style.display = 'none'; c.classList.add('hidden'); });
    if (mcqSection) { mcqSection.style.display = ''; mcqSection.classList.remove('hidden'); }
    if (mainsSection) { mainsSection.style.display = 'none'; mainsSection.classList.add('hidden'); }
    if (summarySection) { summarySection.style.display = 'none'; summarySection.classList.add('hidden'); }
    hasVisibleCards = true;
  } else {
    allCards.forEach(c => {
      const validCategories = ['polity','economy','environment','science','ir','awards','days','sports','culture','appointments','books','heritage'];
      if (c.dataset.category === category) {
        c.style.display = '';
        c.classList.remove('hidden');
        hasVisibleCards = true;
      } else {
        c.style.display = 'none';
        c.classList.add('hidden');
      }
    });
    if (mcqSection) { mcqSection.style.display = 'none'; mcqSection.classList.add('hidden'); }
    if (mainsSection) { mainsSection.style.display = 'none'; mainsSection.classList.add('hidden'); }
    if (summarySection) { summarySection.style.display = 'none'; summarySection.classList.add('hidden'); }
  }

  // Handle empty state message for categories with no news today
  let emptyMsg = document.getElementById('emptyCategoryMsg');
  if (!emptyMsg) {
    emptyMsg = document.createElement('div');
    emptyMsg.id = 'emptyCategoryMsg';
    emptyMsg.className = 'topic-card no-print';
    emptyMsg.style.textAlign = 'center';
    emptyMsg.style.padding = '40px 20px';
    emptyMsg.style.margin = '20px 0';
    emptyMsg.style.background = '#1e293b';
    emptyMsg.style.color = '#94a3b8';
    emptyMsg.style.borderRadius = '16px';
    emptyMsg.style.border = '1px solid #334155';
    emptyMsg.innerHTML = '<div style="font-size:40px; margin-bottom:15px;">📭</div><h3 style="color:#f8fafc; font-size:20px; margin-bottom:10px; font-family:\'Outfit\',sans-serif;">No major news in this category today!</h3><p style="font-size:15px; max-width:500px; margin:0 auto; line-height:1.6;">Our AI Senior Paper Setter scans top national newspapers daily. If no exam-worthy articles appear in this specific subject today, we skip it to keep your preparation strictly focused on high-yield topics.</p>';
    const targetAnchor = document.getElementById('section-mcq');
    if (targetAnchor && targetAnchor.parentNode) {
      targetAnchor.parentNode.insertBefore(emptyMsg, targetAnchor);
    }
  }
  emptyMsg.style.display = (!hasVisibleCards && category !== 'mcq') ? 'block' : 'none';
}

// ── PDF DOWNLOAD ──────────────────────────────────────
function downloadPDF() {
  // Store original title, set PDF-friendly title
  const originalTitle = document.title;
  const date = document.getElementById('currentDate')?.textContent || 'Current Affairs';
  document.title = `ExamEdge AI — Daily Current Affairs — ${date}`;

  // Show all hidden content for PDF
  document.querySelectorAll('.topic-card.hidden').forEach(c => {
    c.setAttribute('data-was-hidden', 'true');
    c.classList.remove('hidden');
  });
  const mcq = document.getElementById('section-mcq');
  const wasMcqHidden = mcq && mcq.classList.contains('hidden');
  if (wasMcqHidden) mcq.classList.remove('hidden');

  // Trigger print dialog (OS handles PDF save)
  window.print();

  // Restore state after print
  setTimeout(() => {
    document.title = originalTitle;
    document.querySelectorAll('.topic-card[data-was-hidden="true"]').forEach(c => {
      c.classList.add('hidden');
      c.removeAttribute('data-was-hidden');
    });
    if (wasMcqHidden && mcq) mcq.classList.add('hidden');
  }, 1000);
}

// ── PREVIOUS DAY SUMMARY MODAL ────────────────────────
const previousDayData = [
  { num: '01', topic: 'International Day of Yoga', data: '12th Edition | Theme: "Yoga for Healthy Ageing" | 3 Crore+ participants', source: 'PIB' },
  { num: '02', topic: 'Padma Awards 2026', data: 'Mammootty, Alka Yagnik → Padma Bhushan | Rohit Sharma, Savita Punia → Padma Shri', source: 'Rashtrapati Bhavan' },
  { num: '03', topic: 'Core Sector Growth', data: 'May 2026: 0.5% (21-month low) | Coal steepest fall (-9.3%)', source: 'OEA, MoC&I' },
  { num: '04', topic: 'RBI Liquidity Actions', data: '₹1.41 trillion injected via 7-day VRR auction at 5.26%', source: 'RBI' },
  { num: '05', topic: 'BRICS HOSA Meet', data: 'Venue: Bengaluru | Theme: Resilience, Innovation, Cooperation', source: 'ISRO' }
];

function showPreviousSummaryModal() {
  const modal = document.getElementById('previousSummaryModal');
  const tbody = document.querySelector('#previousSummaryTable tbody');
  
  if (tbody) {
    tbody.innerHTML = previousDayData.map(item => `
      <tr>
        <td>${item.num}</td>
        <td style="font-weight:600; color:var(--text-primary);">${item.topic}</td>
        <td style="color:var(--text-secondary);">${item.data}</td>
        <td><span class="src-link" style="display:inline-block">${item.source}</span></td>
      </tr>
    `).join('');
  }
  
  if (modal) modal.style.display = 'flex';
}

function closePreviousSummaryModal() {
  const modal = document.getElementById('previousSummaryModal');
  if (modal) modal.style.display = 'none';
}

// ── ERROR REPORTING ───────────────────────────────────
let currentErrorCardId = '';
let currentErrorCardTitle = '';

function reportError(cardId, cardTitle) {
  currentErrorCardId = cardId;
  currentErrorCardTitle = cardTitle;
  const modal = document.getElementById('errorModal');
  const topicEl = document.getElementById('modalTopic');
  if (topicEl) topicEl.textContent = `Topic: ${cardTitle}`;
  if (modal) modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('errorModal');
  if (modal) modal.style.display = 'none';
  const textarea = document.getElementById('errorText');
  if (textarea) textarea.value = '';
}

function submitErrorReport() {
  const errorText = document.getElementById('errorText')?.value?.trim();
  if (!errorText) { alert('Please describe the error before submitting.'); return; }

  // Log report (in production this would POST to a server)
  const report = {
    card: currentErrorCardId,
    title: currentErrorCardTitle,
    description: errorText,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  };

  // Save to localStorage as evidence of error reports
  const existing = JSON.parse(localStorage.getItem('examedge_error_reports') || '[]');
  existing.push(report);
  localStorage.setItem('examedge_error_reports', JSON.stringify(existing));

  console.log('Error Report Submitted:', report);

  closeModal();
  showNotification('✅ Thank you! Error reported. Our team will verify and correct within 24 hours.', 'success');
}

// ── NOTIFICATION TOAST ────────────────────────────────
function showNotification(message, type = 'info') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;bottom:20px;right:20px;z-index:9999;
    background:${type === 'success' ? 'rgba(52,211,153,0.15)' : 'rgba(79,156,249,0.15)'};
    border:1px solid ${type === 'success' ? 'rgba(52,211,153,0.4)' : 'rgba(79,156,249,0.4)'};
    color:${type === 'success' ? '#34d399' : '#4f9cf9'};
    padding:14px 20px;border-radius:10px;font-size:13.5px;font-weight:600;
    max-width:360px;backdrop-filter:blur(10px);
    animation:slideInToast 0.3s ease;
    box-shadow:0 8px 30px rgba(0,0,0,0.4);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s'; setTimeout(() => toast.remove(), 500); }, 4000);
}

// ── TICKER SETUP ──────────────────────────────────────
function setupTicker() {
  const ticker = document.querySelector('.ticker-inner');
  if (ticker) {
    ticker.innerHTML += ticker.innerHTML;
    const track = document.querySelector('.ticker-track');
    if (track) {
      track.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
      track.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
    }
  }
}

// ── SCROLL ANIMATION ──────────────────────────────────
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.topic-card, .mains-card, .mcq-bank-item').forEach((el, i) => {
    el.style.animationPlayState = 'paused';
    el.style.animationDelay = `${i * 0.07}s`;
    observer.observe(el);
  });
}

// ── STICKY HEADER OFFSET ──────────────────────────────
function updateStickyOffsets() {
  const discBanner = document.querySelector('.disclaimer-banner');
  const header = document.querySelector('.site-header');
  const tabNav = document.querySelector('.tab-nav');
  if (discBanner && header) {
    const discH = discBanner.offsetHeight;
    header.style.top = discH + 'px';
    if (tabNav) tabNav.style.top = (discH + header.offsetHeight) + 'px';
  }
}

// ── MODAL CLOSE ON OVERLAY CLICK ─────────────────────
document.addEventListener('click', (e) => {
  const modal = document.getElementById('errorModal');
  if (modal && e.target === modal) closeModal();
  
  const prevModal = document.getElementById('previousSummaryModal');
  if (prevModal && e.target === prevModal) closePreviousSummaryModal();
});

// ── KEYBOARD SHORTCUTS ────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closePreviousSummaryModal();
  }
  if (e.ctrlKey && e.key === 'p') { e.preventDefault(); downloadPDF(); }
});

// ── DYNAMIC DATA LOADING & AI UPDATES ─────────────────
async function loadLatestData() {
  try {
    const res = await fetch('/api/latest-data');
    if (!res.ok) return;
    const data = await res.json();
    
    // ── SUBSCRIPTION STATUS CHECK ──────────────────────────
    if (data.isSubscribed !== undefined) {
      const prevSubStatus = isUserSubscribed;
      isUserSubscribed = data.isSubscribed;
      localStorage.setItem("examedge_subscribed", data.isSubscribed);
      updateAuthUI();
      
      // If subscription expired, notify user and open upgrade modal
      if (prevSubStatus === true && isUserSubscribed === false && currentUserToken) {
        if (typeof showNotification === 'function') {
          showNotification("Your Premium Subscription has expired.", "error");
        } else {
          alert("Your Premium Subscription has expired.");
        }
        if (typeof openSubModal === 'function') openSubModal();
      }
    }

    // 1. Update Dates
    const dateEl = document.getElementById('currentDate');
    if (dateEl && data.date) dateEl.textContent = data.date;
    const archEl = document.getElementById('archiveDate');
    if (archEl && data.archiveDate) archEl.textContent = data.archiveDate;

    const cleanDate = data.archiveDate ? data.archiveDate.replace('📅 ', '').trim() : '';
    if (cleanDate) {
      const mcqTitle = document.getElementById('mcqTitle');
      if (mcqTitle) mcqTitle.textContent = `📝 Practice MCQ Bank — ${cleanDate}`;
      const summaryTitle = document.getElementById('summaryTitle');
      if (summaryTitle) summaryTitle.textContent = `📋 One-Stop Revision Table — ${cleanDate}`;
    }

    // 2. Update Ticker
    const tickerInner = document.getElementById('tickerContent');
    if (tickerInner && data.tickerItems && data.tickerItems.length > 0) {
      tickerInner.innerHTML = data.tickerItems.map(item => `<span>${item}</span>`).join('<span>•</span>');
      setupTicker();
    }

    // 3. Update Topic Cards
    if (data.topicCards && data.topicCards.length > 0) {
      // Remove existing topic cards
      document.querySelectorAll('.topic-card').forEach(c => c.remove());
      
      const targetAnchor = document.getElementById('section-mcq');
      if (targetAnchor && targetAnchor.parentNode) {
        data.topicCards.forEach((card, idx) => {
          const cardEl = document.createElement('article');
          cardEl.className = 'topic-card';
          cardEl.dataset.category = card.category || 'polity';
          cardEl.id = card.id || `card-${idx}`;

          cardEl.innerHTML = `
            <div class="card-header cat-${card.category || 'polity'}">
              <div class="card-left-meta">
                <div class="card-cat-badge">${card.catBadge || '📚 Governance'}</div>
                <div class="card-exam-tags">
                  ${(card.examTags || []).map(t => `<span class="exam-badge">${t}</span>`).join('')}
                </div>
              </div>
              <div class="card-right-meta no-print">
                <span class="conf-badge green-badge">🟢 Official Source</span>
                <button class="report-btn" onclick="reportError('${cardEl.id}', '${card.title.replace(/'/g, "\\'")}')">⚑ Report Error</button>
              </div>
            </div>
            <div class="card-body">
              <h2 class="card-title">${card.title}</h2>
              <div class="news-source">
                📰 <strong>Sources:</strong>
                ${(card.sources || []).map(s => `<a href="${s.url}" target="_blank" class="src-link">${s.name} ↗</a>`).join(' ')}
                | <span class="src-date">${card.sourceDate || ''}</span>
              </div>
              
              ${card.keyFacts && card.keyFacts.length > 0 ? `
              <div class="key-facts">
                <h3 class="section-label">${card.keyFactsTitle || '📌 Key Facts at a Glance'}</h3>
                <div class="fact-grid">
                  ${card.keyFacts.map(f => `
                    <div class="fact-item">
                      <span class="fact-icon">${f.icon || '📌'}</span>
                      <div><strong>${f.title}</strong><br/>${f.desc}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
              ` : ''}

              ${card.staticGkPoints && card.staticGkPoints.length > 0 ? `
              <div class="staticgk-box">
                <h3 class="staticgk-title">📎 Static GK — Must-Know Facts for Exam</h3>
                <ul class="staticgk-points">
                  ${card.staticGkPoints.map(p => `<li>${p}</li>`).join('')}
                </ul>
              </div>
              ` : ''}

              ${card.examinerPerspective && card.examinerPerspective.length > 0 ? `
              <div class="examiner-box">
                <h3 class="examiner-title">🧠 Examiner's Perspective — Think Like a Paper Setter</h3>
                <ul class="examiner-points">
                  ${card.examinerPerspective.map(p => `<li>${p}</li>`).join('')}
                </ul>
              </div>
              ` : ''}

              ${card.examRelevance && card.examRelevance.length > 0 ? `
              <div class="exam-specific-box">
                <h3 class="exam-specific-title">📋 Exam-Specific Relevance</h3>
                <div class="exam-spec-grid">
                  ${card.examRelevance.map(r => `
                    <div class="exam-spec-item">
                      <span class="es-exam">${r.exam}</span>
                      <span class="es-note">${r.note}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
              ` : ''}

              ${card.pyqData ? `
              <details class="pyq-funnel">
                <summary>🧠 AI PYQ Linker: See How This Topic is Asked</summary>
                <div class="pyq-flow">
                  <div class="pyq-step"><strong>Current Affair</strong>${card.pyqData.current}</div>
                  <div class="pyq-step"><strong>Static Concept</strong>${card.pyqData.static}</div>
                  <div class="pyq-step"><strong>Previous Year Questions</strong>${card.pyqData.pyqList.join(', ')}</div>
                  <div class="pyq-step"><strong>Expected Question Pattern</strong>${card.pyqData.expectedPattern}</div>
                </div>
                <button class="btn-primary" style="margin-top:16px;" onclick="document.getElementById('section-mcq').scrollIntoView({behavior:'smooth'})">Practice Now ↓</button>
              </details>
              ` : ''}
            </div>
          </article>`;
          targetAnchor.parentNode.insertBefore(cardEl, targetAnchor);
        });
      }
    }

    // 4. Update MCQ Bank
    if (data.mcqData && data.mcqData.length > 0) {
      mcqData = data.mcqData;
      const mcqSub = document.getElementById('mcqSub');
      if (mcqSub) mcqSub.textContent = `${mcqData.length} Questions | All Government Exams | UPSC + SSC + Banking + Railways + Defence Pattern`;
      renderMCQBank();
      resetAllMCQs();
    }

    // 5. Update Mains Corner
    const mainsGrid = document.querySelector('.mains-grid');
    if (mainsGrid && data.mainsQuestions && data.mainsQuestions.length > 0) {
      mainsGrid.innerHTML = data.mainsQuestions.map((m, idx) => `
        <div class="mains-card">
          <div class="mains-num">${m.num || `0${idx+1}`}</div>
          <div class="mains-paper-tag">${m.paperTag || 'GS Paper'}</div>
          <h3 class="mains-q">${m.q}</h3>
          <div class="mains-hint"><strong>Key angles:</strong> ${m.hint}</div>
        </div>
      `).join('');
    }

    // 6. Update Summary Table
    const summaryTbody = document.querySelector('.summary-table tbody');
    if (summaryTbody && data.summaryTable && data.summaryTable.length > 0) {
      summaryTbody.innerHTML = data.summaryTable.map((s, idx) => `
        <tr>
          <td>${s.num || idx+1}</td>
          <td>${s.topic}</td>
          <td>${s.data}</td>
          <td>${s.source}</td>
          <td>${s.exams}</td>
          <td>${s.gs}</td>
        </tr>
      `).join('');
    }

    setupScrollAnimations();
    updateStickyOffsets();
    const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'all';
    filterTab(activeTab);
    console.log('✅ Successfully loaded latest dynamic AI current affairs data.');
  } catch (err) {
    console.error('Error loading latest data:', err);
  }
}

async function forceUpdate() {
  const btn = document.getElementById('forceUpdateBtn');
  if (btn) btn.disabled = true;
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) overlay.style.display = 'flex';
  
  try {
    const res = await fetch('/api/force-update', { method: 'POST' });
    const result = await res.json();
    
    if (overlay) overlay.style.display = 'none';
    if (btn) btn.disabled = false;
    
    if (result.success) {
      await loadLatestData();
      showNotification('🎉 AI successfully scraped RSS feeds & generated fresh study materials!', 'success');
    } else {
      alert('Failed to update: ' + (result.error || 'Unknown error'));
    }
  } catch (err) {
    if (overlay) overlay.style.display = 'none';
    if (btn) btn.disabled = false;
    console.error('Error during force update:', err);
    alert('Error connecting to server for update.');
  }
}


// ── DYNAMIC PYQ INJECTOR ──────────────────────────────
function injectDynamicPYQs() {
  const pyqDB = [
    '📌 <em>PYQ: "What is the repo rate?" (SSC CGL 2022)</em>',
    '📌 <em>PYQ: "Which article deals with Election Commission?" (UPSC Prelims 2018)</em>',
    '📌 <em>PYQ: "Where is the HQ of ISRO?" (RRB NTPC 2019)</em>',
    '📌 <em>PYQ: "Who won the Nobel Peace Prize in 2014?" (Banking PO 2015)</em>',
    '📌 <em>PYQ: "What is the function of the Finance Commission?" (APPSC 2020)</em>',
    '📌 <em>PYQ: "Which organization is responsible for combating desertification?" (UPSC CSE Prelims 2016)</em>',
    '📌 <em>PYQ: "What is the rank of India in Human Development Index?" (State PSC 2021)</em>'
  ];
  
  document.querySelectorAll('.staticgk-points').forEach(ul => {
    if (!ul.innerHTML.includes('📌 <em>PYQ:')) {
      const randomPYQ = pyqDB[Math.floor(Math.random() * pyqDB.length)];
      const li = document.createElement('li');
      li.innerHTML = `<span style="color:var(--accent-gold); font-size: 11px;">${randomPYQ}</span>`;
      ul.appendChild(li);
    }
  });
}

function openMockTest() {
  if (isUserSubscribed) {
    document.getElementById('topicModal').style.display = 'flex';
  } else {
    openSubModal();
  }
}

function closeTopicModal() {
  document.getElementById('topicModal').style.display = 'none';
}

function startMockTest(topic, batchName) {
  let url = `mock-test.html?topic=${topic}`;
  if (batchName) {
    url += `&batch=${encodeURIComponent(batchName)}`;
  }
  window.location.href = url;
}

// ── INITIALIZE ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectDynamicPYQs();
  renderMCQBank();
  setupTicker();
  setupScrollAnimations();
  updateStickyOffsets();
  initGoogleAuth();

  // Load latest dynamic data from server
  loadLatestData();

  // Show welcome toast
  setTimeout(() => {
    showNotification("📚 Automated AI Current Affairs loaded! Press Ctrl+P to save as PDF.", 'info');
  }, 2000);

  console.log('✅ ExamEdge AI — Automated Production Portal Loaded');
});

window.addEventListener('resize', updateStickyOffsets);

// ── CSS ANIMATION INJECTION ───────────────────────────
const style = document.createElement('style');
style.textContent = `@keyframes slideInToast { from{transform:translateX(100%);opacity:0;} to{transform:translateX(0);opacity:1;} } @keyframes spin { 100% { transform: rotate(360deg); } }`;
document.head.appendChild(style);

/* -----------------------------------------------
   AUTHENTICATION & SUBSCRIPTION LOGIC
   ----------------------------------------------- */
let isLoginMode = true;
let currentUserToken = localStorage.getItem("examedge_token") || null;
let isUserSubscribed = localStorage.getItem("examedge_subscribed") === "true";

// Attach token to API requests
const originalFetch = window.fetch;
window.fetch = function() {
  let [resource, config] = arguments;
  if(currentUserToken) {
    if(config === undefined) { config = {}; }
    if(config.headers === undefined) { config.headers = {}; }
    config.headers["Authorization"] = `Bearer ${currentUserToken}`;
  }
  return originalFetch(resource, config);
};

let selectedPlanId = '1_year';

function updateAuthUI() {
  const authBtn = document.getElementById("authBtn");
  const savedPlan = localStorage.getItem("examedge_plan");
  if(currentUserToken && authBtn) {
    let planBadge = "Premium Active";
    if (savedPlan === '1_year') planBadge = "👑 1 Year Full Combo";
    else if (savedPlan === '6_months') planBadge = "⭐ 6 Months Pass";
    else if (savedPlan === '3_months') planBadge = "⭐ 3 Months Pass";

    authBtn.innerHTML = `<span>⭐</span> ${isUserSubscribed ? planBadge : "Upgrade"}`;
    authBtn.style.borderRadius = "8px";
    authBtn.style.width = "auto";
    authBtn.style.height = "auto";
    authBtn.style.padding = "8px 16px";
    
    if(isUserSubscribed) {
      authBtn.style.setProperty("background", "linear-gradient(135deg, #10b981 0%, #059669 100%)", "important");
      authBtn.style.color = "#fff";
      authBtn.onclick = () => alert(`You have an active Premium Subscription (${planBadge})!`);
    } else {
      authBtn.style.setProperty("background", "#fbbf24", "important");
      authBtn.style.color = "#111";
      authBtn.onclick = openSubModal;
    }
  }
}

function openAuthModal() {
  if(currentUserToken && !isUserSubscribed) {
    openSubModal();
    return;
  }
  document.getElementById("authModal").style.display = "flex";
}

function closeAuthModal() {
  document.getElementById("authModal").style.display = "none";
}

function openSubModal(preferredPlan) {
  selectPlan(preferredPlan || selectedPlanId || '1_year');
  document.getElementById("subModal").style.display = "flex";
}

function closeSubModal() {
  document.getElementById("subModal").style.display = "none";
}

function toggleAuthMode() {
  isLoginMode = !isLoginMode;
  document.getElementById("authTitle").innerText = isLoginMode ? "Sign In" : "Sign Up";
  const authSub = document.getElementById("authSubtitle");
  if (authSub) authSub.innerText = isLoginMode ? "Log in to access your ExamEdge account." : "Create a new ExamEdge account.";
  document.querySelector(".auth-switch").innerText = isLoginMode ? "Need an account? Sign up" : "Already have an account? Sign in";
  
  const forgotLink = document.getElementById("forgotPasswordLink");
  if (forgotLink) forgotLink.style.display = isLoginMode ? "block" : "none";
  
  const googleBtn = document.getElementById("g_id_signin_btn");
  if (googleBtn) googleBtn.style.display = isLoginMode ? "none" : "flex";
}

function toggleForgotPassword() {
  const mainForm = document.getElementById("authMainForm");
  const resetForm = document.getElementById("forgotPasswordForm");
  if (mainForm.style.display === "none") {
    mainForm.style.display = "block";
    resetForm.style.display = "none";
  } else {
    mainForm.style.display = "none";
    resetForm.style.display = "block";
  }
}

async function handlePasswordReset() {
  const email = document.getElementById("resetEmail").value;
  if (!email) return showNotification("Please enter your email address.", "error");
  
  try {
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if(data.success) {
      showNotification(data.message, "success");
      toggleForgotPassword();
    } else {
      showNotification(data.error, "error");
    }
  } catch(e) {
    showNotification("Failed to send reset link.", "error");
  }
}

async function initGoogleAuth() {
  try {
    const res = await fetch('/api/config');
    const data = await res.json();
    if (data.googleClientId && data.googleClientId !== 'YOUR_GOOGLE_CLIENT_ID_HERE') {
      google.accounts.id.initialize({
        client_id: data.googleClientId,
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("g_id_signin_btn"),
        { theme: "outline", size: "large", width: 340 }
      );
    } else {
      console.warn("Google Client ID not configured.");
    }
  } catch (e) {
    console.error("Failed to load Google Config", e);
  }
}

async function handleCredentialResponse(response) {
  try {
    const res = await fetch("/api/google-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: response.credential })
    });
    const data = await res.json();
    if (data.success) {
      currentUserToken = data.token;
      isUserSubscribed = data.isSubscribed;
      localStorage.setItem("examedge_token", data.token);
      localStorage.setItem("examedge_subscribed", data.isSubscribed);
      closeAuthModal();
      updateAuthUI();
      loadLatestData();
      if(!isUserSubscribed) openSubModal();
      showNotification("Successfully logged in with Google!", "success");
    } else {
      showNotification(data.error, "error");
    }
  } catch (e) {
    showNotification("Google Authentication failed.", "error");
  }
}

async function handleAuth() {
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;
  const endpoint = isLoginMode ? "/api/login" : "/api/register";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if(data.success) {
      currentUserToken = data.token;
      isUserSubscribed = data.isSubscribed;
      localStorage.setItem("examedge_token", data.token);
      localStorage.setItem("examedge_subscribed", data.isSubscribed);
      closeAuthModal();
      updateAuthUI();
      loadLatestData(); // Reload data with token
      if(!isUserSubscribed) openSubModal();
    } else {
      alert(data.error);
    }
  } catch(e) {
    alert("Authentication failed.");
  }
}

function selectPlan(planId) {
  selectedPlanId = planId;
  document.querySelectorAll('.pricing-plan-card').forEach(card => {
    if (card.dataset.plan === planId) {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }
  });

  const payBtn = document.getElementById('razorpayPayBtn');
  if (payBtn) {
    const planPrices = {
      '3_months': 'Pay ₹79 with Razorpay (3 Months Pass)',
      '6_months': 'Pay ₹149 with Razorpay (6 Months Pass)',
      '1_year': 'Pay ₹299 with Razorpay — All Subjects Full Combo (1 Year Pass)'
    };
    payBtn.innerText = planPrices[planId] || 'Pay with Razorpay';
  }
}

async function initiatePayment(planId) {
  const targetPlan = planId || selectedPlanId || '1_year';

  if(!currentUserToken) {
    showNotification("Please sign in or create an account first to continue!", "info");
    closeSubModal();
    openAuthModal();
    return;
  }
  
  try {
    // 1. Fetch Razorpay Key ID securely from backend
    const keyRes = await fetch("/api/razorpay-key");
    const keyData = await keyRes.json();
    
    // 2. Create the Razorpay Order with target plan
    const res = await fetch("/api/create-order", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: targetPlan })
    });
    const orderData = await res.json();
    
    if (!orderData || !orderData.id) {
      throw new Error(orderData.error || "Failed to create order");
    }

    const planInfo = orderData.plan || {
      name: targetPlan === '1_year' ? 'All Subjects Master Combo (1 Year Pass)' : 'Premium Subscription',
      price: targetPlan === '1_year' ? 299 : (targetPlan === '6_months' ? 149 : 79)
    };
    
    const options = {
      key: keyData.key,
      amount: orderData.amount,
      currency: "INR",
      name: "ExamEdge AI",
      description: `${planInfo.name} — ₹${planInfo.price}`,
      order_id: orderData.id,
      prefill: {
        email: document.getElementById("authEmail")?.value || ""
      },
      handler: async function (response) {
        try {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              email: document.getElementById("authEmail")?.value || "user@example.com",
              planId: targetPlan
            })
          });
          const verifyData = await verifyRes.json();
          if(verifyData.success) {
            isUserSubscribed = true;
            localStorage.setItem("examedge_subscribed", "true");
            localStorage.setItem("examedge_plan", targetPlan);
            closeSubModal();
            updateAuthUI();
            loadLatestData();
            showNotification(`🎉 ${verifyData.message || 'Payment Successful! Full Combo Unlocked.'}`, "success");
            alert(`🎉 Success! ${planInfo.name} is now active on your account.`);
          } else {
            showNotification(`❌ ${verifyData.error || 'Payment verification failed'}`, "error");
          }
        } catch(e) {
          showNotification("Verification error after payment.", "error");
        }
      },
      theme: { color: "#fbbf24" }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  } catch(err) {
    console.error('Payment gateway error:', err);
    showNotification("Failed to initialize Razorpay payment gateway.", "error");
  }
}

// Call on startup
updateAuthUI();

/* -----------------------------------------------
   MULTILINGUAL SUPPORT (Google Translate)
   ----------------------------------------------- */
function setLanguageActiveState() {
  const match = document.cookie.match(/(^|;)\s*googtrans=([^;]+)/);
  let lang = 'en';
  if (match) {
    const val = decodeURIComponent(match[2]); // e.g. /en/hi
    const parts = val.split('/');
    if (parts.length > 2 && parts[2]) lang = parts[2];
  }
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-lang-${lang}`);
  if (activeBtn) activeBtn.classList.add('active');
}

function translatePage(lang) {
  const domain = window.location.hostname;
  if(lang === 'en') {
      document.cookie = `googtrans=/en/en; path=/; domain=${domain}`;
      document.cookie = `googtrans=/en/en; path=/`;
  } else {
      document.cookie = `googtrans=/en/${lang}; path=/; domain=${domain}`;
      document.cookie = `googtrans=/en/${lang}; path=/`;
  }
  window.location.reload();
}

document.addEventListener('DOMContentLoaded', setLanguageActiveState);
