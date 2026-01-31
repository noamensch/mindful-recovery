/**
 * Generate Narakeet script files for audio generation
 *
 * Run: node generate-narakeet-script.js
 *
 * This creates two text files that can be uploaded to Narakeet:
 * - narakeet-english.txt
 * - narakeet-hebrew.txt
 */

const fs = require('fs');
const audioList = require('./audio-list.json');

function generateNarakeetScript(lang) {
    let script = '';

    // Add voice settings at the top
    if (lang === 'en') {
        script += '(voice: Amy)\n';
        script += '(speed: slow)\n\n';
    } else {
        script += '(voice: Carmit)\n';
        script += '(speed: slow)\n\n';
    }

    // Sessions
    for (const [sessionId, texts] of Object.entries(audioList.sessions)) {
        const langTexts = texts[lang];
        if (!langTexts) continue;

        script += `# Session: ${sessionId}\n`;
        langTexts.forEach((text, index) => {
            script += `\n(output: ${lang}/${sessionId}-${index}.mp3)\n`;
            script += text + '\n';
            script += '(pause: 500ms)\n';
        });
        script += '\n';
    }

    // Grounding
    script += '# Grounding Exercise\n';
    const groundingTexts = audioList.grounding[lang];
    groundingTexts.forEach((text, index) => {
        script += `\n(output: ${lang}/grounding-${index}.mp3)\n`;
        script += text + '\n';
        script += '(pause: 500ms)\n';
    });

    return script;
}

// Generate English script
const englishScript = generateNarakeetScript('en');
fs.writeFileSync('narakeet-english.txt', englishScript);
console.log('Created: narakeet-english.txt');

// Generate Hebrew script
const hebrewScript = generateNarakeetScript('he');
fs.writeFileSync('narakeet-hebrew.txt', hebrewScript);
console.log('Created: narakeet-hebrew.txt');

// Also create a simple list for manual recording
let manualList = '# Audio Files to Record\n\n';

manualList += '## English\n\n';
for (const [sessionId, texts] of Object.entries(audioList.sessions)) {
    manualList += `### ${sessionId}\n`;
    texts.en.forEach((text, i) => {
        manualList += `${sessionId}-${i}.mp3: "${text}"\n`;
    });
    manualList += '\n';
}
manualList += '### grounding\n';
audioList.grounding.en.forEach((text, i) => {
    manualList += `grounding-${i}.mp3: "${text}"\n`;
});

manualList += '\n\n## Hebrew\n\n';
for (const [sessionId, texts] of Object.entries(audioList.sessions)) {
    manualList += `### ${sessionId}\n`;
    texts.he.forEach((text, i) => {
        manualList += `${sessionId}-${i}.mp3: "${text}"\n`;
    });
    manualList += '\n';
}
manualList += '### grounding\n';
audioList.grounding.he.forEach((text, i) => {
    manualList += `grounding-${i}.mp3: "${text}"\n`;
});

fs.writeFileSync('recording-list.md', manualList);
console.log('Created: recording-list.md');

console.log('\nDone! Upload the .txt files to Narakeet or use recording-list.md for manual recording.');
