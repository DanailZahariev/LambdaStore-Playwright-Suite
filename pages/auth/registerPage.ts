import {BasePage} from "../base/basePage";
import {UserData} from "../../utils/types";
import {Locator, Page} from "@playwright/test";

export class RegisterPage extends BasePage {

    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly policyCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly newsLetterYesRadio: Locator;
    private readonly newsLetterNoRadio: Locator;

    public readonly successHeader: Locator;
    public readonly firstNameError: Locator;
    public readonly lastNameError: Locator;
    public readonly emailError: Locator;
    // public readonly telephoneError: Locator;
    // public readonly passwordError: Locator;


    constructor(page: Page) {
        super(page, 'https://ecommerce-playground.lambdatest.io/index.php?route=account/register');

        this.firstNameInput = page.locator('#input-firstname');
        this.lastNameInput = page.locator('#input-lastname');
        this.emailInput = page.locator('#input-email');
        this.telephoneInput = page.locator('#input-telephone');
        this.passwordInput = page.locator('#input-password');
        this.confirmPasswordInput = page.locator('#input-confirm');
        this.policyCheckbox = page.locator('label[for="input-agree"]');
        this.continueButton = page.locator('input[value="Continue"]');
        this.newsLetterYesRadio = page.locator('label[for="input-newsletter-yes"]');
        this.newsLetterNoRadio = page.locator('label[for="input-newsletter-no"]');
        this.successHeader = page.locator('h1:has-text("Your Account Has Been Created!")');
        this.firstNameError = page.locator('#input-firstname + div.text-danger');
        this.lastNameError = page.locator('#input-lastname + div.text-danger');
        this.emailError = page.locator('#input-email + div.text-danger');
    }

    async registerUser(userData: UserData): Promise<void> {
        await this.fillField(this.firstNameInput, userData.firstName);
        await this.fillField(this.lastNameInput, userData.lastName);
        await this.fillField(this.emailInput, userData.email);
        await this.fillField(this.telephoneInput, userData.telephone);
        await this.fillField(this.passwordInput, userData.password);
        await this.fillField(this.confirmPasswordInput, userData.password);

        if (userData.newsletter) {
            await this.clickElement(this.newsLetterYesRadio);
        } else {
            await this.clickElement(this.newsLetterNoRadio);
        }

        await this.clickElement(this.policyCheckbox);
        await this.clickElement(this.continueButton);
    }

    async getEmailValidationMessage(): Promise<string> {
        return await this.emailInput.evaluate((node) => {
            const input = node as HTMLInputElement;
            return input.validationMessage;
        });
    }
}