import {faker} from '@faker-js/faker';
import path = require("node:path");
import fs from "fs";
import {UserData} from "../types";

export function createRandomUser(overrides?: Partial<UserData>): UserData {
    const defaultUser = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        telephone: faker.phone.number(),
        password: faker.internet.password({length: 10}),
        newsletter: faker.datatype.boolean()
    }
    return {...defaultUser, ...overrides};
}


