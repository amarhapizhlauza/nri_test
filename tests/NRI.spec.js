// Harus selalu ada
require(process.cwd() + '/base');
const { test, expect } = require('@playwright/test');

// Initialize page
const magentoPage = require(process.cwd() + '/pages/NRI/magento.page');

//Get Json
const config = require(process.cwd() + '/fixtures/config');

test.describe('NRI', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(config.URL_MAGENTO);
    });

    test('Verify that search box is working properly', async ({ page }) => {
        let MagentoPage = new magentoPage(page);
        await MagentoPage.search_product("jaket");
        await delay(8000)
        await MagentoPage.check_product("jaket");
    })

    test('Verify that Sort functionality is working properly (DESC)', async ({ page }) => {
        let MagentoPage = new magentoPage(page);
        await MagentoPage.search_product("Jaket For Men");
        await delay(8000)
        await MagentoPage.price_desc();
    })

    test('Verify that Sort functionality is working properly (ASC)' , async ({ page }) => {
        let MagentoPage = new magentoPage(page);
        await MagentoPage.search_product("Jaket For Men");
        await delay(8000)
        await MagentoPage.price_asc();
    })

    test('Verify " Add to Cart" is working correctly' , async ({ page }) => {
        let MagentoPage = new magentoPage(page);
        await MagentoPage.search_product("Jaket For Men");
        await delay(8000)
        await MagentoPage.input_product();
    })


})