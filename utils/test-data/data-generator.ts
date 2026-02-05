import {faker} from '@faker-js/faker';
import {UserData} from "../types";

export function createRandomUser(overrides?: Partial<UserData>): UserData {
    const password = faker.internet.password({length: 10});
    const defaultUser = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        telephone: faker.phone.number(),
        password: password,
        confirmPassword: password,
        newsletter: faker.datatype.boolean(),
        agreeToPrivacyPolicy: true
    }
    return {...defaultUser, ...overrides};
}


