import { User, UserRole } from '../models/user.interface';

export class UserMock implements User {
    id: 'a123ads12';
    username = 'test@test.com';
    role: UserRole = 'student';
    firstName: string;
    lastName: string;
    picture: string;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    lastLogin: Date = new Date();

    constructor(picture?: string, firstName?: string, lastName?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.picture = picture;
    }
}
