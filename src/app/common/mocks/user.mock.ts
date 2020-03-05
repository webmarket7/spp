import { build, fake } from 'test-data-bot';

const userRoles = [
    'admin',
    'student',
    'guest'
];

export const userBuilder = build('User').fields({
    id: fake(f => f.random.alphaNumeric(24)),
    username: fake(f => f.internet.email()),
    role: fake(f => f.random.arrayElement(userRoles)),
    firstName: fake(f => f.name.firstName()),
    lastName: fake(f => f.name.lastName()),
    picture: fake(f => f.image.avatar()),
    createdAt: fake(f => f.date.recent()),
    updatedAt: fake(f => f.date.recent()),
    lastLogin: fake(f => f.date.recent())
});
