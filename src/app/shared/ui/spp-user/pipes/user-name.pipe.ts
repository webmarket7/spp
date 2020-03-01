import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../../../store/user/user.model';

@Pipe({
    name: 'userName'
})
export class UserNamePipe implements PipeTransform {

    transform(user: User): string {
        if (user) {
            const { firstName, lastName, username } = user;

            return firstName && lastName ? `${firstName} ${lastName}` : username;
        } else {
            return '';
        }
    }
}
