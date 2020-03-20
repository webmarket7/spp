import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SignInComponent } from './sign-in.component';


describe('SignInComponent', () => {
    let component: SignInComponent;
    let fixture: ComponentFixture<SignInComponent>;

    let store: MockStore<{}>;
    let dispatchSpy;

    const mockCredentials = {email: 'test@test.com', password: '12345678'};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule
            ],
            declarations: [SignInComponent],
            providers: [
                provideMockStore(),
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignInComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        store = TestBed.get<Store<{}>>(Store);
        dispatchSpy = spyOn(store, 'dispatch');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create empty form', () => {
        expect(component.signInForm.value).toEqual({email: '', password: ''});
    });

    it('should initialize form with invalid state', () => {
        expect(component.signInForm.invalid).toBeTruthy();
    });

    it('should validate email and show proper validation messages', () => {
        const emailControl = component.signInForm.get('email');

        emailControl.setValue('');

        expect(emailControl.valid).toBeFalsy();
        expect(emailControl.hasError('required')).toBeTruthy();

        emailControl.setValue('test');

        expect(emailControl.valid).toBeFalsy();
        expect(emailControl.hasError('email')).toBeTruthy();

        emailControl.setValue(mockCredentials.email);

        expect(emailControl.valid).toBeTruthy();
    });

    it('should validate password and show proper validation message', () => {
        const passwordControl = component.signInForm.get('password');

        passwordControl.setValue('');

        expect(passwordControl.valid).toBeFalsy();
        expect(passwordControl.hasError('required')).toBeTruthy();
    });

    it('should make form valid, when proper data are set', () => {
        component.signInForm.setValue(mockCredentials);

        expect(component.signInForm.valid).toBeTruthy();
    });

    it('should dispatch correct value on submit', () => {
        const emailControl = component.signInForm.get('email');
        const passwordControl = component.signInForm.get('password');

        emailControl.setValue(mockCredentials.email);
        passwordControl.setValue(mockCredentials.password);

        component.onSubmit();

        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
            credentials: {username: mockCredentials.email, password: mockCredentials.password}
        }));
    });
});
