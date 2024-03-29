import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signIn } from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { State } from '../../store';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss', '../styles/auth.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {

    signInForm: FormGroup;

    get emailControl(): AbstractControl {
        return this.signInForm.get('email');
    }

    get passwordControl(): AbstractControl {
        return this.signInForm.get('password');
    }

    constructor(
        private title: Title,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private store: Store<State>
    ) {
    }

    ngOnInit(): void {
        this.title.setTitle('Sign in');
        this.signInForm = this.initForm();
    }

    initForm(): FormGroup {
        return this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    getEmailErrorMessage(): string {
        return this.emailControl.hasError('required') ? 'You must enter a value' :
            this.emailControl.hasError('email') ? 'Not a valid email' :
                '';
    }

    getPasswordErrorMessage(): string {
        return this.passwordControl.hasError('required') ? 'You must enter a value' : '';
    }

    onSubmit(): void {
        const {email, password} = this.signInForm.value;

        this.store.dispatch(signIn({
            credentials: {username: email, password},
            redirectTo: this.activatedRoute.snapshot.queryParamMap.get('redirectTo')
        }));
    }
}
