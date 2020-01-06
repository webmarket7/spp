import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesListViewComponent } from './articles-list-view.component';

describe('ArticlesListViewComponent', () => {
    let component: ArticlesListViewComponent;
    let fixture: ComponentFixture<ArticlesListViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ArticlesListViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticlesListViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
