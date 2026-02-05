import {Locator, Page} from "@playwright/test";

export abstract class BasePage {

    protected page: Page
    protected url: string

    protected constructor(page: Page, url: string) {
        this.page = page
        this.url = url
    }

    protected async clickElement(locator: Locator): Promise<void> {
        await this.waitForVisible(locator);
        await locator.highlight();
        await locator.click();
    }

    async navigate(): Promise<void> {
        await this.page.goto(this.url)
    }

    protected async fillField(locator: Locator, text: string): Promise<void> {
        await this.waitForVisible(locator);
        await locator.fill(text);
    }

    protected async checkElement(locator: Locator): Promise<void> {
        await this.waitForVisible(locator);
        await locator.check();
    }

    protected async selectOption(locator: Locator, value: string): Promise<void> {
        await this.waitForVisible(locator);
        await locator.selectOption({label: value}); // или { value: value }
    }

    protected async getInnerText(locator: Locator): Promise<string> {
        await this.waitForVisible(locator);
        return (await locator.innerText()).trim(); // trim() е добра практика
    }

    protected async getAllTextContents(locator: Locator): Promise<string[]> {
        await this.waitForVisible(locator.first());
        return await locator.allTextContents();
    }

    protected async getAttribute(locator: Locator, attributeName: string): Promise<string | null> {
        await this.waitForVisible(locator);
        return await locator.getAttribute(attributeName);
    }

    protected async waitForVisible(locator: Locator): Promise<void> {
        await locator.waitFor({state: "visible", timeout: 10000});
    }

    protected async waitForHidden(locator: Locator): Promise<void> {
        await locator.waitFor({state: "hidden"});
    }

    protected async waitForUrlToContain(urlPart: string): Promise<void> {
        await this.page.waitForURL(`**/*${urlPart}*`);
    }

    protected async isElementVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    async getTitle() {
        return await this.page.title();
    }

    protected getElement(selector: string) {
        return this.page.locator(selector);
    }

    public async getURL(): Promise<string> {
        return this.page.url();
    }
}