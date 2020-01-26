import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { checkEmailValidity } from '../../common/helpers';
import { AuthService } from '../auth.service';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {

    email = '';
    emailValid: boolean;
    password = '';

    constructor(
        private title: Title,
        private authService: AuthService
    ) {}

    onEmailChange(email: string): void {
        this.email = email;
        this.emailValid = checkEmailValidity(email);
    }

    ngOnInit(): void {
        this.title.setTitle('Sign in');
    }

    onSubmit(): void {
        this.authService.signIn({username: this.email, password: this.password});
    }
}
