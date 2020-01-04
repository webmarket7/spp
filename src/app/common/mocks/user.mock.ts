import { UserRole } from '../models/user.interface';

export class User {
    id: 'a123ads12';
    username = 'test@test.com';
    role: UserRole = 'student';
    firstName: string;
    lastName: string;
    picture: string;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    lastLogin: Date = new Date();

    constructor(firstName?: string, lastName?: string, picture?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.picture = picture;
    }
}