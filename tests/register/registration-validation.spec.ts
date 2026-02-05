import {expect, test} from "../fixtures/baseTest";
import {ErrorMessages} from "../../utils/messages";
import {createRandomUser} from '../../utils/test-data/data-generator';

test.describe("Registration Form - First Name Boundaries (BVA)", () => {

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

test.describe("Registration Form - Last Name Boundaries (BVA)", () => {
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

test.describe('Field: Email (HTML5 Validation)', () => {
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
