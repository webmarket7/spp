import { Location } from '@angular/common';
import { Component, DebugElement, Directive, HostListener, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, inject, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ContentsSidebarMenuComponent } from './contents-sidebar-menu.component';
import { RouterTestingModule } from '@angular/router/testing';


@Component({
    selector: 'app-dashboard',
    template: ''
})
class DashboardComponent {
}

@Component({
    selector: 'app-articles',
    template: ''
})
class ArticlesComponent {
}

@Directive({
    selector: '[routerLink]'
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: string;
    navigatedTo: string = null;

    @HostListener('click')
    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe('ContentsSidebarMenuComponent', () => {
    let component: ContentsSidebarMenuComponent;
    let fixture: ComponentFixture<ContentsSidebarMenuComponent>;
    let router: Router;
    let location: Location;

    const routes = [
        {
            path: 'app/dashboard',
            component: DashboardComponent
        },
        {
            path: 'app/articles',
            component: ArticlesComponent
        },
        {
            path: '',
            redirectTo: 'app/articles',
            pathMatch: 'full'
        }
    ];
    const menuItems = [
        {
            label: 'Dashboard',
            icon: 'dashboard',
            path: '/app/dashboard'
        },
        {
            label: 'Articles',
            icon: 'newspaper',
            path: '/app/articles'
        }
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes)
            ],
            declarations: [
                ContentsSidebarMenuComponent,
                DashboardComponent,
                ArticlesComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentsSidebarMenuComponent);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        location = TestBed.get(Location);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xdescribe('test router links with stub', () => {
        let linkDes: DebugElement[];
        let routerLinks: RouterLinkStubDirective[];

        beforeEach(() => {
            component.menuItems = menuItems;
            fixture.detectChanges();
            linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
            routerLinks = linkDes.map(de => de.injector.get(RouterLinkStubDirective));
        });

        it('should have routerLinks on anchors', () => {
            expect(routerLinks).toHaveLength(2);
            expect(routerLinks[0].linkParams).toBe(menuItems[0].path);
            expect(routerLinks[1].linkParams).toBe(menuItems[1].path);
        });

        it('should navigate to correct path when user clicks anchor', () => {
            const dashboardLinkDe = linkDes[0];
            const dashboardLink = routerLinks[0];

            expect(dashboardLink.navigatedTo).toBeNull();

            dashboardLinkDe.triggerEventHandler('click', new MouseEvent('click'));
            fixture.detectChanges();

            expect(dashboardLink.navigatedTo).toBe(menuItems[0].path);
        });
    });

    describe('test actual router links', () => {
        let linkDes: DebugElement[];

        beforeEach(() => {
            component.menuItems = menuItems;
            fixture.detectChanges();
            linkDes = fixture.debugElement.queryAll(By.css('a'));
        });

        it('should have routerLinks on anchors', () => {
            expect(linkDes).toHaveLength(2);
            expect(linkDes[0].properties).toHaveProperty('href', menuItems[0].path);
            expect(linkDes[1].properties).toHaveProperty('href', menuItems[1].path);
        });

        it('should navigate to correct path when user clicks anchor with actual routerLink',
            async(inject([Router, Location], (injectedRouter: Router, injectedLocation: Location) => {
                injectedRouter.initialNavigation();
                const routerSpy = spyOn(injectedRouter, 'navigateByUrl');

                linkDes[0].triggerEventHandler('click', new MouseEvent('click'));
                fixture.detectChanges();

                fixture.whenStable().then(() => {
                    expect(routerSpy).toHaveBeenCalled();
                    expect(injectedLocation.path()).toEqual('/app/dashboard');
                });
            }))
        );

        it('should navigate to correct path when user clicks anchor with actual routerLink - fakeAsync', fakeAsync(() => {
            router.initialNavigation();
            const routerSpy = spyOn(router, 'navigateByUrl');

            linkDes[0].nativeElement.click();

            flushMicrotasks();
            tick();

            expect(routerSpy).toHaveBeenCalled();
            expect(location.path()).toEqual('/app/dashboard');
        }));
    });
});
