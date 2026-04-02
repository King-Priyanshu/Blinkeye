const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  const errors = [];
  const consoleLogs = [];
  
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', error => errors.push(error.message));

  console.log("Navigating to /puppeteer-login...");
  await page.goto('http://127.0.0.1:8000/puppeteer-login', { waitUntil: 'networkidle0', timeout: 15000 });
  
  const url = page.url();
  console.log("Final URL:", url);
  
  await new Promise(r => setTimeout(r, 3000));
  
  const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 500));
  const bodyHTML = await page.evaluate(() => document.body.innerHTML.substring(0, 1000));
  
  console.log("\n--- BODY TEXT (first 500 chars) ---");
  console.log(bodyText || "(empty)");
  console.log("\n--- BODY HTML (first 1000 chars) ---");
  console.log(bodyHTML);
  console.log("\n--- CONSOLE LOGS ---");
  consoleLogs.forEach(l => console.log(l));
  console.log("\n--- PAGE ERRORS ---");
  errors.forEach(e => console.log(e));
  
  await browser.close();
})();
