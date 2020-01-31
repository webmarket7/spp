import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { checkEmailValidity } from '../../common/helpers';
import { AuthService } from '../auth.service';


@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

    email: string;
    emailValid: boolean;

    password: string;
    confirmPassword: string;
    passwordValid: boolean;

    constructor(
        private authService: AuthService,
        private title: Title
    ) {}

    ngOnInit(): void {
        this.title.setTitle('Sign in');
    }

    onEmailChange(email: string): void {
        this.email = email;
        this.emailValid = checkEmailValidity(email);
    }

    checkPasswordLength(password: string): boolean {
        return password && password.length >= 8;
    }

    checkPasswordValidity(): boolean {
        return this.checkPasswordLength(this.password) && this.checkPasswordLength(this.confirmPassword)
            ? this.password === this.confirmPassword
            : false;
    }

    onPasswordChange(password: string): void {
        this.password = password;
        this.passwordValid = this.checkPasswordValidity();
    }

    onConfirmPasswordChange(confirmPassword: string): void {
        this.confirmPassword = confirmPassword;
        this.passwordValid = this.checkPasswordValidity();
    }

    onSubmit(): void {
        this.authService.signUp({username: this.email, password: this.password});
    }
}
