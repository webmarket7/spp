import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SppFilterService {

    getQueryParamMap = (): Observable<ParamMap> => this.activatedRoute.queryParamMap;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    getSelectedIds(filterName: string, separator = ','): Observable<Array<number | string>> {
        return this.getQueryParamMap().pipe(map((queryParamMap: ParamMap) => {
            const queryParamsString = queryParamMap.get(filterName);

            return queryParamsString && queryParamsString.length
                ? queryParamsString.split(separator)
                : [];
        }));
    }

    getList(sources: Observable<any>[], searchParam: string): Observable<any[]> {
        return combineLatest(sources).pipe(
            map(([searchTerm, entities]: [string, any[]]) => {
                return entities.filter((item: any) => searchTerm
                    ? RegExp(searchTerm, 'gi').test(item[searchParam])
                    : true);
            })
        );
    }

    changeQueryParams(ids: Array<string | number>, filterName: string, separator = ','): void {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                [filterName]: ids.join(separator) || null
            },
            queryParamsHandling: 'merge'
        });
    }
}
