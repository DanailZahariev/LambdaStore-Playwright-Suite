import {test, expect} from '../fixtures/baseTest';
import {UserData} from "../../utils/types";
import * as usersData from '../../utils/test-data/users.json';
import {createRandomUser} from "../../utils/test-data/data-generator";

const testUser: UserData = usersData[0];
test.describe("Account Registration Tests", () => {

    test("Happy Path: Should register a new user successfully", async ({registerPage}) => {
        await registerPage.navigate();
        await registerPage.registerUser(testUser);

        await expect(registerPage.successHeader).toBeVisible();
    });
});

test.describe('Registration Form - Valid Boundaries', () => {

    const validScenarios = [
        {label: 'Min Boundary (1 char)', firstName: 'A'},
        {label: 'Max Boundary (32 chars)', firstName: 'A'.repeat(32)}
    ];

    for (const scenario of validScenarios) {
        test(`Should register successfully with: ${scenario.label}`, async ({registerPage, page}) => {

            const validUser = createRandomUser({firstName: scenario.firstName});

            await registerPage.navigate();
            await registerPage.registerUser(validUser);

            await expect(registerPage.successHeader).toBeVisible();

            await expect(registerPage.firstNameError).not.toBeVisible();
        });
    }
});