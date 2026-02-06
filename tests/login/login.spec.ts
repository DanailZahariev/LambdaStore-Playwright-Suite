import {expect, test} from "../fixtures/baseTest";
import {generateUserViaApi} from "../../utils/api-helper"
import {createRandomUser} from "../../utils/test-data/data-generator";
import {UserData} from "../../utils/types";
import {ErrorMessages} from "../../utils/messages";

test.describe("Login Tests", () => {
    let validUser: UserData;

    test.beforeEach(async ({request}) => {
        validUser = createRandomUser();
        await generateUserViaApi(request, validUser);
    });

    test('Happy Path: Should login successfully with valid credentials', async ({loginPage, accountPage, page}) => {
        await loginPage.navigate();

        await loginPage.login(validUser.email, validUser.password);

        await expect(page).toHaveTitle('My Account');
        await expect(accountPage.pageHeader).toBeVisible();
    });

    test('Unhappy Path: Should not login with invalid password', async ({loginPage}) => {
        await loginPage.navigate();

        await loginPage.login(validUser.email, validUser.password + "1");

        await expect(loginPage.getWarningText()).toBeVisible();
        await expect(loginPage.getWarningText()).toContainText(ErrorMessages.Login.NoMatch);
    });

    test('Unhappy Path: Should not login with non-existing email', async ({loginPage}) => {
        const nonExistingEmail = 'user' + Date.now() + '@test.com';

        await loginPage.navigate();
        await loginPage.login(nonExistingEmail, 'somePass123');

        await expect(loginPage.getWarningText()).toBeVisible();
    });
});