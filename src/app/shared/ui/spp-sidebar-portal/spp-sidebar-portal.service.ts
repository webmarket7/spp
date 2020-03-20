import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SppSidebarPortalService {

    templateRef: TemplateRef<any>;
    portal: BehaviorSubject<TemplateRef<any>> = new BehaviorSubject(null);

    constructor() {
    }

    getPortal(): Observable<TemplateRef<any>> {
        return this.portal.asObservable();
    }

    projectInPortal(templateRef: TemplateRef<any>): void {
        this.templateRef = templateRef;
        this.portal.next(templateRef);
    }

    clearPortal(): void {
        this.templateRef = null;
        this.portal.next(null);
    }
}
