import { Component, forwardRef, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageUploaderComponent),
            multi: true
        }
    ]
})
export class ImageUploaderComponent implements ControlValueAccessor {

    preview: string | ArrayBuffer;

    @HostListener('dragover', ['$event']) onDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    @HostListener('dragleave', ['$event']) onDragLeave(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    @HostListener('drop', ['$event'])
    onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        const file = files[0];

        this.readFile(file);
        this.propagateChange(file);
    }

    propagateChange = (_: File) => {};

    constructor() {
    }

    readFile(file: File): void {
        const fileReader = new FileReader();

        fromEvent(fileReader, 'load').pipe(take(1)).subscribe((event: ProgressEvent) => {
            this.preview = (event.target as FileReader).result;
        });

        fileReader.readAsDataURL(file);
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(value: File | string): void {
        if (value instanceof File) {
            this.readFile(value);
        } else {
            this.preview = value;
        }
    }

    onChange(event: any): void {
        const files = event.target.files;
        const file = files[0];

        this.readFile(file);
        this.propagateChange(file);
    }
}
