import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../common/custom-validators';
import { Subscription, SubscriptionLike } from 'rxjs';


@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit, OnDestroy {

    signUpForm: FormGroup;
    passwordSubscription: SubscriptionLike = Subscription.EMPTY;

    get emailControl(): AbstractControl {
        return this.signUpForm.get('email');
    }

    get passwordControl(): AbstractControl {
        return this.signUpForm.get('password');
    }

    get confirmPasswordControl(): AbstractControl {
        return this.signUpForm.get('confirmPassword');
    }

    constructor(private title: Title,
                private fb: FormBuilder,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.title.setTitle('Sign up');
        this.signUpForm = this.initForm();

        this.passwordSubscription = this.passwordControl.valueChanges.subscribe(() => {
            this.confirmPasswordControl.updateValueAndValidity();
        });
    }

    ngOnDestroy(): void {
        this.passwordSubscription.unsubscribe();
    }

    initForm(): FormGroup {
        return this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, CustomValidators.compareWith('password')]]
        });
    }

    getEmailErrorMessage(): string {
        return this.emailControl.hasError('required')
            ? 'You must enter a value' :
            this.emailControl.hasError('email')
                ? 'Not a valid email'
                : '';
    }

    getPasswordErrorMessage(): string {
        return this.passwordControl.hasError('required')
            ? 'You must enter a value'
            : this.passwordControl.hasError('minlength')
                ? `Password must contain ${this.passwordControl.getError('minlength').requiredLength} symbols or more`
                : '';
    }

    getConfirmPasswordErrorMessage(): string {
        return this.confirmPasswordControl.hasError('required')
            ? 'You must enter a value'
            : this.confirmPasswordControl.hasError('mismatch')
                ? 'Passwords do not match'
                : '';
    }

    onSubmit(): void {
        const {email, password} = this.signUpForm.value;

        this.authService
            .performSignUp({credentials: {username: email, password}})
            .subscribe();
    }
}
