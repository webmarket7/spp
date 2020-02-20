import { Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'spp-list-search',
    templateUrl: './spp-list-search.component.html',
    styleUrls: ['./spp-list-search.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SppListSearchComponent),
            multi: true
        }
    ]
})
export class SppListSearchComponent implements ControlValueAccessor {
    searchTerm: string;
    isDisabled: boolean;

    @Input() placeholder?: string;
    @Output() create: EventEmitter<{ value: string }> = new EventEmitter<{ value: string }>();

    @HostBinding('class.can-create') private _canCreate: boolean;
    @ViewChild('searchInput', {static: false}) searchInput: ElementRef<HTMLInputElement>;

    get canCreate(): boolean {
        return this.create.observers.length && this.searchTerm && this.searchTerm.length >= 3;
    }

    private propagateChange = (value: string) => {};
    private propagateTouched = (event: FocusEvent) => {};

    constructor() {
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    writeValue(searchTerm: string): void {
        this.searchTerm = searchTerm;
    }

    createEntity(event: MouseEvent): void {
        event.stopPropagation();

        this.create.emit({value: this.searchTerm});
    }

    onModelChange(value: string): void {
        this.propagateChange(value);
    }

    onBlur(event: FocusEvent): void {
        this.propagateTouched(event);
    }
}
