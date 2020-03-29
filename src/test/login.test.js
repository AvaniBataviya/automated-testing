const faker = require('faker');
const puppeteer = require('puppeteer');

const person = {
  email: faker.internet.email(),
  password: faker.internet.password()
};

const loginData = {
  email: 'avanibataviya@gmail.com',
  password: 'A{32<6['
};

// global variable
let browser;
let page;

beforeAll(async () => {
  // launch browser
  browser = await puppeteer.launch(
    {
      headless: false, // Whether to run browser in headless mode. Default is true, here false means open chromium browser to check action visually
      slowMo: 100, // slows down puppeteer operations by the specified amount of milliseconds
      // devtools: true
    }
  );

  // creates a new page in the opened browser
  page = await browser.newPage();

});

beforeEach(async () => {
  await page.goto(URL, {waitUntil: 'domcontentloaded'});
});

describe('Login Functionality Testing', () => {

  test('Click submit button without filling form', async () => {
    //check with static title it's login page or not
    await page.waitForSelector('.page-title');
    const html = await page.$eval('.page-title', e => e.innerHTML);
    expect(html).toBe('Login');

    //click on submit button
    await page.click("button[name=submit]");

    //check email and password error
    await page.waitForSelector('.emailError');
    const emailError = await page.$eval('.emailError', e => e.innerHTML);
    expect(emailError).toBe('Please enter email.');
    await page.waitForSelector('.passwordError');
    const passwordError = await page.$eval('.passwordError', e => e.innerHTML);
    expect(passwordError).toBe('Please enter password.');
  }, timeOut);

  test('Write email and click submit button', async () => {
    await page.click("input[name=email]");
    await page.type("input[name=email]", person.email);
    await page.click("button[name=submit]");
    await page.waitForSelector('.passwordError');
    const passwordError = await page.$eval('.passwordError', e => e.innerHTML);
    expect(passwordError).toBe('Please enter password.');
  }, timeOut);

  test('Fill from with email and password and click submit button', async () => {
    await page.click("input[name=email]");
    await page.type("input[name=email]", loginData.email);
    await page.click("input[name=password]");
    await page.type("input[name=password]", loginData.password);
    await page.click("button[name=submit]");
    await page.waitForSelector('.page-title');
    const html = await page.$eval('.page-title', e => e.innerHTML);
    expect(html).toBe('Welcome');
  }, timeOut);
});

afterAll(() => {
  browser.close()
});
