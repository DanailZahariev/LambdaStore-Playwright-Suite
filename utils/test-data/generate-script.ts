import fs from 'fs';
import path from 'path';
import {faker} from '@faker-js/faker';
import {createRandomUser} from './data-generator';
import {UserData} from '../types';

function generateUsersFile(count: number) {
    const users: UserData[] = faker.helpers
        .multiple(() => createRandomUser(), {count: count});

    const filePath = path.join(__dirname, '../test-data/users.json');

    try {
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}

generateUsersFile(5);