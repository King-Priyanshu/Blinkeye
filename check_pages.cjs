const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  const urls = [
    'http://127.0.0.1:8000/',
    'http://127.0.0.1:8000/login',
    'http://127.0.0.1:8000/admin/dashboard',
    'http://127.0.0.1:8000/book-appointment'
  ];

  for(const url of urls) {
      console.log(`\nChecking ${url}...`);
      await page.goto(url, { waitUntil: 'networkidle2' });
      // wait a bit for vue to render
      await new Promise(r => setTimeout(r, 1000));
      const bodyHTML = await page.evaluate(() => document.body.innerHTML);
      console.log(`Body length: ${bodyHTML.length} characters`);
  }

  await browser.close();
})();
