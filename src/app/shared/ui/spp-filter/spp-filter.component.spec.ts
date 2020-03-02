import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SppFilterComponent } from './spp-filter.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SppFilterService } from './services/spp-filter.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { articlesListBuilder } from '../../../common/mocks/article.mock';
import { of } from 'rxjs';
import { Article } from '../../../store/article/article.model';


describe('SppFilterComponent', () => {
    let component: SppFilterComponent;
    let fixture: ComponentFixture<SppFilterComponent>;
    let sppFilterService: SppFilterService;
    const articles: Article[] = articlesListBuilder(10);

    beforeEach(async(() => {

        const sppFilterServiceSpy = jest.fn(() => ({
            getSelectedIds: jest.fn().mockReturnValue(of([])),
            getList: jest.fn().mockImplementation(() => of(articles)),
            changeQueryParams: jest.fn()
        }));

        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                ReactiveFormsModule,
                OverlayModule
            ],
            declarations: [SppFilterComponent],
            providers: [
                {provide: SppFilterService, useValue: sppFilterServiceSpy()}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SppFilterComponent);
        component = fixture.componentInstance;
        sppFilterService = TestBed.get(SppFilterService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should init component with correct data', () => {
        const dataSourceMock = of(articles);
        const filterNameMock = 'tagIds';

        component.name = filterNameMock;
        component.dataSource = dataSourceMock;
        component.ngOnInit();

        expect(sppFilterService.getSelectedIds).toBeCalledTimes(1);
        expect(sppFilterService.getSelectedIds).toBeCalledWith(filterNameMock);

        expect(sppFilterService.getList).toBeCalledTimes(1);
        expect(sppFilterService.getList).toBeCalledWith([component.search$, dataSourceMock], 'name');
    });

    it('should toggle dropdown', () => {
        fixture.detectChanges();
        const filterButtonDe = fixture.debugElement.query(By.css('spp-filter-button'));

        filterButtonDe.triggerEventHandler('click', new MouseEvent('click'));

        expect(component.open).toBeTruthy();

        filterButtonDe.triggerEventHandler('click', new MouseEvent('click'));

        expect(component.open).toBeFalsy();
    });

    it('should close dropdown when user clicks backdrop', () => {
        fixture.detectChanges();
        component.open = true;
        component.onBackdropClick( new MouseEvent('click'));

        expect(component.open).toBeFalsy();
    });

    it('should apply filter', () => {
        const mockSelectedIds = articles.slice(0, 3).map((article: Article) => article.id);

        component.name = 'tagIds';
        component.applyFilter({selectedIds: mockSelectedIds});

        expect(sppFilterService.changeQueryParams).toBeCalledTimes(1);
        expect(sppFilterService.changeQueryParams).toBeCalledWith(mockSelectedIds, 'tagIds', ',');
    });

    it('should reset filter', () => {
        component.name = 'tagIds';
        component.resetFilter();

        expect(sppFilterService.changeQueryParams).toBeCalledTimes(1);
        expect(sppFilterService.changeQueryParams).toBeCalledWith([], 'tagIds', ',');
    });
});
