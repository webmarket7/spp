import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MediaService {

    private endpoint = 'media';

    constructor(
        private apiService: ApiService,
    ) {
    }

    uploadImage(image: string | File): Observable<string> {
        if (image instanceof File) {
            const formData = new FormData();

            formData.append('fileUpload', image);

            return this.apiService.postRequest(this.endpoint, formData).pipe(map((res: { mediaUrl: string }) => res.mediaUrl));
        } else {
            return of(image);
        }
    }
}
