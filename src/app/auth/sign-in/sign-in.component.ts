import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { checkEmailValidity } from '../../common/helpers';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

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
        private activatedRoute: ActivatedRoute,
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
        this.authService.signIn(
            {username: this.email, password: this.password},
            this.activatedRoute.snapshot.queryParamMap.get('redirectTo')
        );
    }
}
