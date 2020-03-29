const puppeteer = require('puppeteer');

describe('Test google title ', () => {
  test('Check page title', async () => {
    let browser = await puppeteer.launch(
      {
        headless: false,
        slowMo: 100,
      }
    );
    let page = await browser.newPage();
    await page.goto('https://www.google.com/');
    const title = await page.title();
    expect(title).toBe('Google');
    await browser.close();
  }, timeOut);

});
