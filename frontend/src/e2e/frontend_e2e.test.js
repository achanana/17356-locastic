/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: true,
    });
    page = await browser.newPage();
    page.emulate({
        viewport: {
            width: 1200,
            height: 800
        },
        userAgent: ''
    });
    await page.goto('http://localhost:3000');
}, 20000);

describe('e2e test', () => {
    test('renders tiles from backend', async () => {
        await page.waitForSelector('.MuiGrid-grid-xs-4');
    });
    test('page header renders', async () => {
        await page.waitForSelector('.MuiToolbar-gutters');
    });
    test('add to cart works properly', async () => {
        await page.waitForSelector('.qty_increment');
        await page.click('.qty_increment');
        await page.waitForSelector('.MuiBadge-badge');
        expect(await page.$eval('.MuiBadge-badge', node => node.innerText)).toBe('1');
    });
    test('navigate to individual item page from homepage', async () => {
        await page.waitForSelector('.MuiGrid-grid-xs-4');
        await Promise.all([
            page.waitForNavigation(),
            page.click('div.MuiCardContent-root > h5 > a')
        ]);
        await page.waitForSelector('dl');
        await page.waitForSelector('dt');
    });
});

afterAll(async () => {
    browser.close();
});