import {BasePage} from "../base/basePage";
import {Locator, Page} from "@playwright/test";

export class LoginPage extends BasePage {

    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly warningMessage: Locator;

    constructor(page: Page) {
        super(page, 'account/login');
        this.emailInput = page.locator('#input-email');
        this.passwordInput = page.locator('#input-password');
        this.loginButton = page.locator('input[value="Login"]');
        this.warningMessage = page.locator('div.alert-danger');
    }

    async login(email: string, password: string): Promise<void> {
        await this.fillField(this.emailInput, email);
        await this.fillField(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }

    getWarningText() {
        return this.warningMessage;
    }
}