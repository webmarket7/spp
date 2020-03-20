import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SppUserPicComponent } from './spp-user-pic.component';
import { userBuilder } from '../../../../common/mocks/user.mock';

@Component({
    selector: 'spp-icon',
    template: '',
})
class SppIconMockComponent {
    @Input() icon: string;
}

describe('SppUserPicComponent', () => {
    let component: SppUserPicComponent;
    let fixture: ComponentFixture<SppUserPicComponent>;

    const user = userBuilder();
    const getUserPicture = () => fixture.debugElement.query(By.css('img'));
    const getPlaceholder = () => fixture.debugElement.query(By.css('.spp-user-pic__placeholder'));
    const getPlaceholderIcon = () => fixture.debugElement.query(By.directive(SppIconMockComponent));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SppUserPicComponent, SppIconMockComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SppUserPicComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add an edge if needed', () => {
        fixture.detectChanges();
        console.log({classes: fixture.debugElement.classes});

        expect(fixture.debugElement.classes).toHaveProperty('edge', true);
    });

    it('should apply default container size if no custom container size provided', () => {
        fixture.detectChanges();

        expect(fixture.debugElement.styles).toHaveProperty('height', '40px');
        expect(fixture.debugElement.styles).toHaveProperty('width', '40px');
    });

    it('should apply custom container size if provided', () => {
        component.ngOnChanges({
            containerSize: new SimpleChange(undefined, 36, true)
        });
        fixture.detectChanges();

        expect(fixture.debugElement.styles).toHaveProperty('height', '36px');
        expect(fixture.debugElement.styles).toHaveProperty('width', '36px');
    });

    it('should apply custom container height and width if provided', () => {
        component.containerHeight = 25;
        component.containerWidth = 20;
        fixture.detectChanges();

        expect(fixture.debugElement.styles).toHaveProperty('height', '25px');
        expect(fixture.debugElement.styles).toHaveProperty('width', '20px');
    });

    it('should render picture if it is provided', () => {
        component.picture = user.picture;
        fixture.detectChanges();

        expect(getUserPicture()).toBeTruthy();
    });

    it('should render placeholder if no picture is provided', () => {
        fixture.detectChanges();

        expect(getPlaceholder()).toBeTruthy();
    });

    it('should render user icon with size 24px in a placeholder by default', () => {
        fixture.detectChanges();
        const icon = getPlaceholderIcon();

        expect(icon.context).toHaveProperty('icon', 'user');
        expect(icon.styles).toHaveProperty('height', '24px');
        expect(icon.styles).toHaveProperty('width', '24px');
    });

    it('should render custom placeholder icon with custom size if needed', () => {
        component.icon = 'test';
        component.iconSize = 12;
        fixture.detectChanges();
        fixture.detectChanges();
        const icon = getPlaceholderIcon();

        expect(icon.context).toHaveProperty('icon', 'test');
        expect(icon.styles).toHaveProperty('height', '12px');
        expect(icon.styles).toHaveProperty('width', '12px');
    });
});
