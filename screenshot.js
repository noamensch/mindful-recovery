const puppeteer = require('puppeteer');

async function takeScreenshots() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 400, height: 800 });

    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });

    // Screenshot English home
    await page.screenshot({ path: 'screenshot-en-home.png' });
    console.log('Saved: screenshot-en-home.png');

    // Go to settings and switch to Hebrew
    await page.click('[data-screen="settings-screen"]');
    await new Promise(resolve => setTimeout(resolve, 300));
    await page.click('.lang-btn[data-lang="he"]');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Screenshot Hebrew settings
    await page.screenshot({ path: 'screenshot-he-settings.png' });
    console.log('Saved: screenshot-he-settings.png');

    // Go to home
    await page.evaluate(() => {
        document.querySelector('[data-screen="home-screen"]').click();
    });
    await new Promise(resolve => setTimeout(resolve, 500));

    // Screenshot Hebrew home
    await page.screenshot({ path: 'screenshot-he-home.png' });
    console.log('Saved: screenshot-he-home.png');

    await browser.close();
    console.log('\nDone! Check the screenshot files.');
}

takeScreenshots().catch(console.error);
