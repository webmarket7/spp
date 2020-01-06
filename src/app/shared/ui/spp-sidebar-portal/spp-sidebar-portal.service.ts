import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SppSidebarPortalService {
    portal: BehaviorSubject<TemplateRef<any>> = new BehaviorSubject(null);

    constructor() {
    }

    getPortal(): Observable<TemplateRef<any>> {
        return this.portal.asObservable();
    }

    projectInPortal(templateRef: TemplateRef<any>): void {
        this.portal.next(templateRef);
    }

    clearPortal(): void {
        this.portal.next(null);
    }
}
