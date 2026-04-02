const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  const errors = [];
  const consoleLogs = [];
  
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', error => errors.push(error.message));

  console.log("Navigating to /puppeteer-login (auto-redirects to admin dashboard)...");
  await page.goto('http://127.0.0.1:8000/puppeteer-login', { waitUntil: 'networkidle0' });
  
  console.log("Dashboard URL:", page.url());
  
  await new Promise(r => setTimeout(r, 1000));
  
  console.log("Navigating to /admin/appointments...");
  await page.goto('http://127.0.0.1:8000/admin/appointments', { waitUntil: 'networkidle0' });
  
  console.log("Appointments URL:", page.url());
  
  await new Promise(r => setTimeout(r, 1000));
  
  const bodyText = await page.evaluate(() => {
     // Get stats text to verify data loaded
     const stats = Array.from(document.querySelectorAll('dl > div')).map(el => el.innerText.replace(/\n/g, ' ')).join(' | ');
     // Get table rows count
     const tableRows = document.querySelectorAll('tbody tr').length;
     return { stats, tableRows };
  });
  
  console.log("\n--- PAGE DATA ---");
  console.log("Stats found:", bodyText.stats);
  console.log("Table rows count:", bodyText.tableRows);
  
  console.log("\n--- CONSOLE LOGS ---");
  consoleLogs.forEach(l => console.log(l));
  console.log("\n--- PAGE ERRORS ---");
  errors.forEach(e => console.log(e));
  
  await browser.close();
})();
