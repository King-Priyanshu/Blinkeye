const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log("Logging in via /puppeteer-login...");
  await page.goto('http://127.0.0.1:8000/puppeteer-login', { waitUntil: 'networkidle0' });
  
  await new Promise(r => setTimeout(r, 2000));
  
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  console.log(`Admin Dashboard body length: ${bodyHTML.length} characters`);
  
  await browser.close();
})();
