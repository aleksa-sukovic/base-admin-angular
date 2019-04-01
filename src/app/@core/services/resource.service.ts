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

    one(id: number, params?: any): Observable<Model>
    {
        return this.apiService.get(this.path + '/' + id, params)
            .pipe(
                map(data => this.convert(data.body.data))
            );
    }

    save(model: Model): Observable<Model>
    {
        if (!model.id || model.id == -1) {
            return this.create(model);
        }

        return this.update(model);
    }

    create(model: Model): Observable<Model>
    {
        return this.apiService.post(this.path, model)
            .pipe(
                map(data => this.convert(data.body.data))
            );
    }

    update(model: Model): Observable<Model>
    {
        return this.apiService.put(this.path, model)
            .pipe(
                map(data => this.convert(data.body.data))
            );
    }

    protected abstract convert(data: any): Model;
}
