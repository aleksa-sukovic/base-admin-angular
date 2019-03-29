import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resource } from '../models/resource.model';
import { Injector, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export abstract class ResourceService<Model extends Resource>
{
    protected apiService: ApiService;

    constructor(protected path: string, injector: Injector)
    {
        this.apiService = injector.get(ApiService);
    }

    all(params?: any): Observable<Model[]>
    {
        return this.apiService.get(this.path, params).
            pipe(
                map(data => {
                    let converted = [];

                    for (let item of data.body.data) {
                        converted.push(this.convert(item));
                    }

                    return converted;
                })
            )
    }

    protected abstract convert(data: any): Model;
}
