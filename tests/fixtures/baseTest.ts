import {RegisterPage} from "../../pages/auth/registerPage";
import {test as base} from '@playwright/test';

type myFixtures = {
    registerPage: RegisterPage
}

export const test = base.extend<myFixtures>({

    registerPage: async ({page}, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    }
});

export {expect} from '@playwright/test';