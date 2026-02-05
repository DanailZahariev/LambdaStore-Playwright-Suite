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

test.describe('Registration Form - First Name Valid Boundaries', () => {

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

test.describe('Registration Form - Last Name Valid Boundaries', () => {
    const validScenarios = [
        {label: 'Min Boundary (1 char)', lastName: 'A'},
        {label: 'Max Boundary (32 chars)', lastName: 'A'.repeat(32)}
    ]

    for (const scenario of validScenarios) {
        test(`Should register successfully with: ${scenario.label}`, async ({registerPage}) => {
            const validUser = createRandomUser({lastName: scenario.lastName});

            await registerPage.navigate();
            await registerPage.registerUser(validUser);

            await expect(registerPage.successHeader).toBeVisible();
            await expect(registerPage.lastNameError).not.toBeVisible();
        });
    }
});


test.describe('Registration Form - Telephone Valid Boundaries', () => {
    const validScenarios = [
        {label: 'Min Boundary (3 chars)', telephone: '3'.repeat(3)},
        {label: 'Max Boundary (32 chars)', telephone: '3'.repeat(32)}
    ]

    for (const scenario of validScenarios) {
        test(`Should register successfully with: ${scenario.label}`, async ({registerPage}) => {
            const validUser = createRandomUser({telephone: scenario.telephone});

            await registerPage.navigate();
            await registerPage.registerUser(validUser);

            await expect(registerPage.successHeader).toBeVisible();
            await expect(registerPage.telephoneError).not.toBeVisible();
        });
    }
});

test.describe('Registration Form - Password Valid Boundaries', () => {
    const validScenarios = [
        {label: 'Min Boundary (4 chars)', password: '1'.repeat(4)},
        {label: 'Max Boundary (20 chars)', password: '1'.repeat(20)}
    ]
    for (const scenario of validScenarios) {
        test(`Should register successfully with: ${scenario.label}`, async ({registerPage}) => {
            const validUser = createRandomUser({
                password: scenario.password,
                confirmPassword: scenario.password
            });

            await registerPage.navigate();
            await registerPage.registerUser(validUser);

            await expect(registerPage.successHeader).toBeVisible();
            await expect(registerPage.passwordError).not.toBeVisible();

        });
    }
});