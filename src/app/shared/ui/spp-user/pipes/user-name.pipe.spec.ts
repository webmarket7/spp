import { UserNamePipe } from './user-name.pipe';
import { userBuilder } from '../../../../common/mocks/user.mock';
import { User } from '../../../../store/user/user.model';

describe('UserNamePipe', () => {
    let pipe: UserNamePipe;

    beforeAll(() => {
        pipe = new UserNamePipe();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return empty string if user is not provided', () => {
        expect(pipe.transform(null)).toEqual('');
    });

    it('should return first and last name if user specified those', () => {
        const user: User = userBuilder();

        expect(pipe.transform(user)).toEqual(`${user.firstName} ${user.lastName}`);
    });

    it('should return username if user has not specified first and last name', () => {
        const user: User = userBuilder();

        user.firstName = null;
        user.lastName = null;

        expect(pipe.transform(user)).toEqual(user.username);
    });
});
