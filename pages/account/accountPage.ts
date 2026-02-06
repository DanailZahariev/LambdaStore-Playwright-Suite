import {BasePage} from "../base/basePage";
import {Locator, Page} from "@playwright/test";

export class AccountPage extends BasePage{

    public readonly pageHeader: Locator;

    constructor(page: Page) {
        super(page, "account/account");
        this.pageHeader = page.locator('h2', { hasText: 'My Account' });
    }
}