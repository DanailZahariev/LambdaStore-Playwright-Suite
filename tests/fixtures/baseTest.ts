import {RegisterPage} from "../../pages/auth/registerPage";
import {test as base} from '@playwright/test';
import {LoginPage} from "../../pages/auth/loginPage";
import {AccountPage} from "../../pages/account/accountPage";

type myFixtures = {
    registerPage: RegisterPage
    loginPage: LoginPage
    accountPage: AccountPage
}

export const test = base.extend<myFixtures>({

    registerPage: async ({page}, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },

    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    accountPage: async ({page}, use) => {
        const accountPage = new AccountPage(page);
        await use(accountPage);
    }
});

export {expect} from '@playwright/test';