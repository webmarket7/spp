import { ArticleCardTypeDirective } from './article-card-type.directive';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    template: '<div *ngFor="let article of articles; index as i" [articleCardType]="i">{{ article }}</div>'
})
export class ParentMockComponent {
    articles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
}

describe('ArticleCardTypeDirective', () => {
    let component: ParentMockComponent;
    let fixture: ComponentFixture<ParentMockComponent>;
    let cardDebugElements: DebugElement[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ParentMockComponent, ArticleCardTypeDirective]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ParentMockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        cardDebugElements = fixture.debugElement.queryAll(By.css('div'));
    });

    it('should create an instance', () => {
        const directive = new ArticleCardTypeDirective();

        expect(directive).toBeTruthy();
    });

    it('should give first item css classes "list-item" and "wide"', () => {
        const firstCardDe = cardDebugElements[0];
        const cardClasses = firstCardDe.classes;

        expect(cardClasses).toHaveProperty('list-item', true);
        expect(cardClasses).toHaveProperty('tile', false);
        expect(cardClasses).toHaveProperty('wide', true);
    });

    it('should give second, third, fourth and fifth items css class "tile"', () => {
        const cardsSubset = cardDebugElements.slice(1, 5);

        cardsSubset.forEach((cardDe: DebugElement) => {
            const cardClasses = cardDe.classes;

            expect(cardClasses).toHaveProperty('list-item', false);
            expect(cardClasses).toHaveProperty('tile', true);
            expect(cardClasses).toHaveProperty('wide', false);
        });
    });

    it('should give sixth item css classes "tile" and "wide"', () => {
        const sixthCardDe = cardDebugElements[5];
        const cardClasses = sixthCardDe.classes;

        expect(cardClasses).toHaveProperty('list-item', false);
        expect(cardClasses).toHaveProperty('tile', true);
        expect(cardClasses).toHaveProperty('wide', true);
    });

    it('should repeat pattern', () => {
        const firstCardsSubset = cardDebugElements.slice(0, 6);
        const secondCardsSubset = cardDebugElements.slice(6, 14);

        firstCardsSubset.forEach((cardDe: DebugElement, index: number) => {
            expect(cardDe.classes).toEqual(secondCardsSubset[index].classes);
        });
    });
});
