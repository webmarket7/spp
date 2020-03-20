import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { async, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

import { SppFilterService } from './spp-filter.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ArticleTag } from '../../../../store/article-tag/article-tag.model';
import { articleTagsListBuilder } from '../../../../common/mocks/article-tag.mock';

@Component({
    template: `
        <router-outlet></router-outlet>`
})
export class ArticlesFeedComponent {
}

describe('SppFilterService', () => {
    const tags: ArticleTag[] = articleTagsListBuilder(3);
    const tagIds = tags.map((article) => article.seq);
    const tagIdsString = tagIds.join(',');
    const path = 'app/articles/feed/default';

    const routes = [
        {
            path: '',
            redirectTo: path,
            pathMatch: 'full'
        },
        {
            path,
            component: ArticlesFeedComponent
        }
    ];
    let service: SppFilterService;
    let location: Location;
    let router: Router;
    let navigateSpy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [ArticlesFeedComponent],
            providers: [SppFilterService]
        });

        router = TestBed.get(Router);
        location = TestBed.get(Location);
        service = TestBed.get(SppFilterService);
        navigateSpy = spyOn(router, 'navigate');

        router.initialNavigation();
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should redirect', () => {
        expect(location.path()).toEqual(`/${path}`);
    });

    it('should get empty array if there are no filter query params', fakeAsync(() => {
        const getQueryParamMapSpy = jest
            .spyOn(service, 'getQueryParamMap')
            .mockReturnValue(
                of((convertToParamMap({})))
            );
        const ids$ = service.getSelectedIds('tagIds');

        expect(getQueryParamMapSpy).toBeCalledTimes(1);

        ids$.subscribe((ids) => {
            expect(ids).toHaveLength(0);
        });
        tick();
    }));

    it('should get tag ids from query params', fakeAsync(() => {
        const getQueryParamMapSpy = jest
            .spyOn(service, 'getQueryParamMap')
            .mockReturnValue(
                of((convertToParamMap({tagIds: tagIdsString})))
            );
        const ids$ = service.getSelectedIds('tagIds');

        expect(getQueryParamMapSpy).toBeCalledTimes(1);

        ids$.subscribe((ids: Array<number | string>) => {
            expect(ids).toHaveLength(3);
        });
        tick();
    }));

    it('should filter list of items by search term', fakeAsync(() => {
        const searchParam = 'name';
        const searchTermMock = 'test';

        tags[0].name = searchTermMock;

        service.getList([of(searchTermMock), of(tags)], searchParam).subscribe((result) => {
            expect(result).toHaveLength(1);
            expect(result[0]).toHaveProperty('name', 'test');
        });
        tick();
    }));

    it('should return list of items as is if search term is missing', fakeAsync(() => {
        const searchParam = 'name';
        const searchTermMock = '';

        service.getList([of(searchTermMock), of(tags)], searchParam).subscribe((result) => {
            expect(result).toHaveLength(3);
        });
        tick();
    }));

    it('should change query params', fakeAsync(() => {
        const route = TestBed.get(ActivatedRoute);

        service.changeQueryParams(tagIds, 'tagIds');
        flushMicrotasks();

        expect(navigateSpy).toHaveBeenCalledTimes(1);
        expect(navigateSpy).toHaveBeenCalledWith([], {
            queryParams: {tagIds: tagIdsString},
            queryParamsHandling: 'merge',
            relativeTo: route
        });
    }));
});
