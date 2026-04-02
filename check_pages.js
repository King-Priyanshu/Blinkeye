const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log("Checking /login...");
  await page.goto('http://127.0.0.1:8000/login', { waitUntil: 'networkidle2' });
  
  console.log("Checking /admin/dashboard...");
  await page.goto('http://127.0.0.1:8000/admin/dashboard', { waitUntil: 'networkidle2' });

  console.log("Checking /book-appointment...");
  await page.goto('http://127.0.0.1:8000/book-appointment', { waitUntil: 'networkidle2' });

  await browser.close();
})();
