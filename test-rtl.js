const puppeteer = require('puppeteer');

async function testRTL() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Capture console logs
    page.on('console', msg => console.log('BROWSER:', msg.text()));

    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.session-card');

    // Check initial state (English - LTR)
    console.log('\n=== INITIAL STATE (English) ===');
    let cardStyle = await page.$eval('.session-card', el => el.style.flexDirection);
    console.log('session-card inline flexDirection:', cardStyle || '(not set)');

    let computedStyle = await page.$eval('.session-card', el => window.getComputedStyle(el).flexDirection);
    console.log('session-card computed flexDirection:', computedStyle);

    // Click Hebrew language button - go to settings first
    console.log('\n=== SWITCHING TO HEBREW ===');
    await page.click('[data-screen="settings-screen"]');
    await new Promise(resolve => setTimeout(resolve, 300));

    await page.waitForSelector('.lang-btn[data-lang="he"]');
    await page.click('.lang-btn[data-lang="he"]');

    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check setting items on settings page
    console.log('\n=== SETTINGS PAGE AFTER HEBREW ===');
    let settingStyle = await page.$eval('.setting-item', el => el.style.flexDirection);
    console.log('setting-item inline flexDirection:', settingStyle || '(not set)');

    let settingComputed = await page.$eval('.setting-item', el => window.getComputedStyle(el).flexDirection);
    console.log('setting-item computed flexDirection:', settingComputed);

    // Go back to home to check session cards
    await page.click('[data-screen="home-screen"]');
    await new Promise(resolve => setTimeout(resolve, 300));
    await page.waitForSelector('.session-card');

    console.log('\n=== HOME PAGE AFTER HEBREW ===');
    cardStyle = await page.$eval('.session-card', el => el.style.flexDirection);
    console.log('session-card inline flexDirection:', cardStyle || '(not set)');

    computedStyle = await page.$eval('.session-card', el => window.getComputedStyle(el).flexDirection);
    console.log('session-card computed flexDirection:', computedStyle);

    // Check body class and dir
    const bodyClass = await page.$eval('body', el => el.className);
    console.log('body className:', bodyClass);

    const bodyDir = await page.$eval('body', el => el.dir);
    console.log('body dir:', bodyDir);

    await browser.close();

    console.log('\n========================================');
    console.log('=== TEST RESULTS ===');
    console.log('========================================');

    if (computedStyle === 'row-reverse') {
        console.log('SUCCESS: Session cards have row-reverse (play button on LEFT)');
    } else {
        console.log('FAILURE: Session cards have', computedStyle, '(play button still on RIGHT)');
    }

    if (settingComputed === 'row-reverse') {
        console.log('SUCCESS: Setting items have row-reverse (toggles on LEFT)');
    } else {
        console.log('FAILURE: Setting items have', settingComputed, '(toggles still on RIGHT)');
    }
}

testRTL().catch(console.error);
