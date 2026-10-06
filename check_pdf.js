const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('economy one short.pdf');
pdf(dataBuffer).then(function(data) {
    console.log("Pages:", data.numpages);
    console.log("Text length:", data.text.length);
    console.log("Sample text:\\n", data.text.substring(0, 500));
}).catch(err => console.error(err));
