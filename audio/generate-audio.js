/**
 * Generate audio files using Google Translate TTS
 *
 * This creates MP3 files for all session instructions in English and Hebrew
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const audioList = require('./audio-list.json');

// Google Translate TTS URL
function getTTSUrl(text, lang) {
    const encodedText = encodeURIComponent(text);
    // Google Translate TTS endpoint
    return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${lang}&client=tw-ob`;
}

// Download audio file
function downloadAudio(url, outputPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(outputPath);

        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        }, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // Follow redirect
                https.get(response.headers.location, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                }, (redirectResponse) => {
                    redirectResponse.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        resolve();
                    });
                }).on('error', reject);
            } else if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                reject(new Error(`HTTP ${response.statusCode}`));
            }
        }).on('error', reject);
    });
}

// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate audio for a single text
async function generateAudio(text, lang, outputPath) {
    const langCode = lang === 'he' ? 'he' : 'en';

    // Google TTS has a limit of ~200 characters, so we might need to truncate
    const truncatedText = text.length > 200 ? text.substring(0, 200) : text;

    const url = getTTSUrl(truncatedText, langCode);

    try {
        await downloadAudio(url, outputPath);
        console.log(`✓ ${path.basename(outputPath)}`);
        return true;
    } catch (error) {
        console.error(`✗ ${path.basename(outputPath)}: ${error.message}`);
        return false;
    }
}

// Main function
async function main() {
    console.log('Generating audio files...\n');

    // Ensure directories exist
    if (!fs.existsSync('en')) fs.mkdirSync('en');
    if (!fs.existsSync('he')) fs.mkdirSync('he');

    let successCount = 0;
    let failCount = 0;

    // Generate session audio
    for (const [sessionId, texts] of Object.entries(audioList.sessions)) {
        console.log(`\nSession: ${sessionId}`);

        // English
        for (let i = 0; i < texts.en.length; i++) {
            const outputPath = `en/${sessionId}-${i}.mp3`;
            const success = await generateAudio(texts.en[i], 'en', outputPath);
            if (success) successCount++; else failCount++;
            await sleep(500); // Rate limiting
        }

        // Hebrew
        for (let i = 0; i < texts.he.length; i++) {
            const outputPath = `he/${sessionId}-${i}.mp3`;
            const success = await generateAudio(texts.he[i], 'he', outputPath);
            if (success) successCount++; else failCount++;
            await sleep(500); // Rate limiting
        }
    }

    // Generate grounding audio
    console.log(`\nGrounding exercise`);

    // English grounding
    for (let i = 0; i < audioList.grounding.en.length; i++) {
        const outputPath = `en/grounding-${i}.mp3`;
        const success = await generateAudio(audioList.grounding.en[i], 'en', outputPath);
        if (success) successCount++; else failCount++;
        await sleep(500);
    }

    // Hebrew grounding
    for (let i = 0; i < audioList.grounding.he.length; i++) {
        const outputPath = `he/grounding-${i}.mp3`;
        const success = await generateAudio(audioList.grounding.he[i], 'he', outputPath);
        if (success) successCount++; else failCount++;
        await sleep(500);
    }

    console.log(`\n=============================`);
    console.log(`Done! ${successCount} succeeded, ${failCount} failed`);
}

main().catch(console.error);
