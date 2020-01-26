import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppUserPicComponent } from './spp-user-pic.component';

describe('SppUserPicComponent', () => {
    let component: SppUserPicComponent;
    let fixture: ComponentFixture<SppUserPicComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SppUserPicComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SppUserPicComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
