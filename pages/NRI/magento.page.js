const { test, expect } = require('@playwright/test');

/* Page Locators */
const BUTTON_NEW_EMPLOYEE = "//div[contains(text(),'New Employee')]";
const VERIFY_NOTIF = '.mr-4';

const NAME_FIELD = "//input[contains(@placeholder,'Name')]";
const EMAIL_FIELD = "//input[@placeholder='Email']";

const OPTION = '(//span[@class="flex items-center"])[1]';
const CONFIRM_DELETE = '//div[@class="dialog-content"]//button[text()="Delete"]';
const VERIFY_DELETE = '//div[text()="Success delete data"]';

const SEARCH_FIELD = '//input[@id="search"]';
const ITEM_LIST = '//dd[@class="item"]/a';
const OPTION_PRODUCT = '(//select[@id="sorter"])[1]';
const SORT = '(//a[@title="Set Ascending Direction"])[1]';

/* Page Actions */
class employeePage {
    constructor(page) {
        this.page = page;
    }

    async search_product(name) {
        await this.page.locator(SEARCH_FIELD).fill(name);
        await this.page.locator(SEARCH_FIELD).press('Enter');
    }

    async check_product(name) {
        const elements = await this.page.$$(ITEM_LIST);

        for (const element of elements) {
            let text = await element.textContent();
            text = text.toLowerCase();
            expect(text).toContain(name)
        }
    }

    async price_desc() {
        await this.page.locator(OPTION_PRODUCT).click();
        await delay(3000)
        await this.page.getByRole('combobox', { name: 'Sort By' }).selectOption('price');
        await this.page.locator(SORT).click();
        await delay(3000)

        const elements = await this.page.$$('//*[@data-price-type="finalPrice"]');

        const prices = [];
        for (const element of elements) {
            const priceText = await element.textContent();
            const price = parseFloat(priceText.replace(/[^\d.-]/g, ''));
            prices.push(price);
        }

        const checkPrice = Math.max(...prices);
        expect(prices[0]).toBe(checkPrice)
    }

    async price_asc() {
        await this.page.locator(OPTION_PRODUCT).click();
        await delay(3000)
        await this.page.getByRole('combobox', { name: 'Sort By' }).selectOption('price');
        await this.page.getByRole('link', { name: ' Set Ascending Direction' }).click();
        await this.page.getByRole('link', { name: ' Set Descending Direction' }).click();
        await delay(3000)

        const elements = await this.page.$$('//*[@data-price-type="finalPrice"]');

        const prices = [];
        for (const element of elements) {
            const priceText = await element.textContent();
            const price = parseFloat(priceText.replace(/[^\d.-]/g, ''));
            prices.push(price);
        }

        const checkPrice = Math.min(...prices);
        expect(prices[0]).toBe(checkPrice)
    }

    async input_product() {
        await this.page.locator(OPTION_PRODUCT).click();
        await delay(3000)
        await this.page.getByRole('combobox', { name: 'Sort By' }).selectOption('price');
        await this.page.locator(SORT).click();
        await delay(3000)

        await this.page.getByRole('link', { name: 'Jupiter All-Weather Trainer' }).first().click();

        //Get Text
        let size = await this.page.getByRole('option', { name: 'M' }).textContent();
        let colours = await this.page.getByRole('option', { name: 'Blue' }).getAttribute('option-label');

        console.log(size)
        console.log(colours)

        await this.page.getByRole('option', { name: 'M' }).click();
        await this.page.getByRole('option', { name: 'Blue' }).click();
        await this.page.getByRole('button', { name: 'Add to Cart' }).click();

        //Check Add
        await this.page.getByText('You added Jupiter All-Weather Trainer to your shopping cart.').click();

        await this.page.getByRole('link', { name: ' My Cart 1 1 items' }).click();
        await this.page.getByText('See Details').click();

        // Get Text 2
        let size2 = await this.page.locator('#mini-cart').getByText('M', { exact: true }).textContent();
        let colours2 = await this.page.locator('#mini-cart').getByText('Blue').textContent();

        expect(size).toBe(size2)
        expect(colours).toBe(colours2)

        await this.page.locator('#mini-cart').getByText('M', { exact: true }).click();
        await this.page.locator('#mini-cart').getByText('Blue').click();
    }
}

module.exports = employeePage;
