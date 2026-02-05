import {expect, test} from "../fixtures/baseTest";
import {ErrorMessages} from "../../utils/messages";
import {createRandomUser} from '../../utils/test-data/data-generator';

test.describe("Registration Form - First Name Invalid Boundaries (BVA)", () => {

    const invalidScenarios = [
        {label: 'Empty (0 chars)', firstName: '', expectedError: ErrorMessages.Register.FirstName},
        {label: 'Max + 1 (33 chars)', firstName: 'A'.repeat(33), expectedError: ErrorMessages.Register.FirstName},
        {label: 'Way too long (100 chars)', firstName: 'A'.repeat(100), expectedError: ErrorMessages.Register.FirstName}
    ];

    for (const scenario of invalidScenarios) {
        test(`Should show error when First Name is: ${scenario.label}`, async ({registerPage}) => {
            const invalidUser = createRandomUser({firstName: scenario.firstName});

            await registerPage.navigate();
            await registerPage.registerUser(invalidUser);

            await expect(registerPage.firstNameError).toBeVisible();
            await expect(registerPage.firstNameError).toHaveText(scenario.expectedError);

        });
    }
});

test.describe("Registration Form - Last Name Invalid Boundaries (BVA)", () => {
    const invalidScenarios = [
        {label: 'Empty (0 chars)', lastName: '', expectedError: ErrorMessages.Register.LastName},
        {label: 'Max + 1 (33 chars)', lastName: 'A'.repeat(33), expectedError: ErrorMessages.Register.LastName},
        {label: 'Way too long (100 chars)', lastName: 'A'.repeat(100), expectedError: ErrorMessages.Register.LastName}]
    for (const scenario of invalidScenarios) {
        test(`Should show error when Last Name is: ${scenario.label}`, async ({registerPage}) => {
            const invalidUser = createRandomUser({lastName: scenario.lastName});

            await registerPage.navigate();
            await registerPage.registerUser(invalidUser);

            await expect(registerPage.lastNameError).toBeVisible();
            await expect(registerPage.lastNameError).toHaveText(scenario.expectedError);
        });
    }
});

test.describe('Registration Form - Email (HTML5 Validation)', () => {
    const scenarios = [
        {label: 'Missing @', email: 'dadamail.bg', expectedPart: "include an '@'"},
        {label: 'Missing domain', email: 'dada@', expectedPart: "enter a part following '@'"},
    ];

    for (const scenario of scenarios) {
        test(`Should show browser validation for: ${scenario.label}`, async ({registerPage}) => {
            const invalidUser = createRandomUser({email: scenario.email});
            await registerPage.navigate();

            await registerPage.registerUser(invalidUser);

            expect(await registerPage.getEmailValidationMessage()).toContain(scenario.expectedPart);
        });
    }
});

test.describe("Registration Form - Telephone Invalid Boundaries (BVA)", () => {
    const scenarios = [
        {label: 'Empty (0 chars)', telephone: '', expectedError: ErrorMessages.Register.Telephone},
        {label: 'Min Boundary (2 chars)', telephone: '12', expectedError: ErrorMessages.Register.Telephone},
        {label: 'Max + 1 (33 chars)', telephone: '1'.repeat(33), expectedError: ErrorMessages.Register.Telephone}
    ];

    for (const scenario of scenarios) {
        test(`Should show error when Telephone is: ${scenario.label}`, async ({registerPage}) => {
            const invalidUser = createRandomUser({telephone: scenario.telephone});

            await registerPage.navigate();
            await registerPage.registerUser(invalidUser);

            await expect(registerPage.telephoneError).toBeVisible();
        });
    }
});

test.describe("Registration Form - Password Invalid Boundaries (BVA)", () => {
    const scenarios = [
        {label: 'Empty (0 chars)', password: '', expectedError: ErrorMessages.Register.Password},
        {label: 'Min - 1 (3 chars)', password: '1'.repeat(3), expectedError: ErrorMessages.Register.Password},
    ];

    for (const scenario of scenarios) {
        test(`Should show error when Password is: ${scenario.label}`, async ({registerPage}) => {
            const invalidUser = createRandomUser({password: scenario.password});

            await registerPage.navigate();

            await registerPage.registerUser(invalidUser);

            await expect(registerPage.passwordError).toBeVisible();
        });
    }
});

test.describe("Registration Form - Password don't match", () => {
    test(`Should show error when Password don't match`, async ({registerPage}) => {
        const userWithMismatch = createRandomUser({password: "WrongPassword123"})

        await registerPage.navigate();
        await registerPage.registerUser(userWithMismatch);

        await expect(registerPage.passwordMismatchError).toBeVisible();
        await expect(registerPage.passwordMismatchError).toHaveText(ErrorMessages.Register.PasswordDontMatch);
    })
});

test.describe('Policy Validation', () => {
    test('Should require Privacy Policy agreement', async ({registerPage}) => {
        const disagreeingUser = createRandomUser({agreeToPrivacyPolicy: false});

        await registerPage.navigate();
        await registerPage.registerUser(disagreeingUser);

        await expect(registerPage.policyError).toBeVisible();
        await expect(registerPage.policyError).toContainText('Warning: You must agree to the Privacy Policy!');
    });
});