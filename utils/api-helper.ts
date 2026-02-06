import {APIRequestContext} from "@playwright/test";
import {UserData} from "./types";

export async function generateUserViaApi(request: APIRequestContext, user: UserData) {
    const response = await request.post('index.php?route=account/register', {
        form: {
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            telephone: user.telephone,
            password: user.password,
            confirm: user.password,
            agree: '1',
            newsletter: user.newsletter ? '1' : '0'
        }
    });

    if (response.status() !== 200 && response.status() !== 302) {
        throw new Error(`API Registration failed with status: ${response.status()}`);
    }
}