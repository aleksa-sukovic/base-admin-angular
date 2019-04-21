import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Resource } from '../models/resource.model';
import { Injector, Injectable } from '@angular/core';
import { CollectionApiResponse } from '../interfaces/collection.api.response';
import { ItemApiResponse } from '../interfaces/item.api.response';

@Injectable({
    providedIn: 'root'
})
export abstract class ResourceService<Model extends Resource<Model>>
{
    protected apiService: ApiService;

    constructor(protected path: string, injector: Injector)
    {
        this.apiService = injector.get(ApiService);
    }

    all(params?: any): Observable<CollectionApiResponse<Model>>
    {
        return this.apiService.get(this.path, params).
            pipe(
                map(data => {
                    let converted = [];

                    for (let item of data.body.data) {
                        converted.push(this.convert(item));
                    }

                    return {
                        getCollection: () => converted,
                        getRaw: () => data.body
                    };
                })
            )
    }

    one(id: number, params?: any): Observable<ItemApiResponse<Model>>
    {
        return this.apiService.get(this.path + '/' + id, params)
            .pipe(
                map(data => {
                    return {
                        getItem: () => this.convert(data.body.data),
                        getRaw: () => data.body
                    }
                })
            );
    }

    save(model: Model): Observable<ItemApiResponse<Model>>
    {
        if (!model.id || model.id == -1) {
            return this.create(model);
        }

        return this.update(model);
    }

    create(model: Model): Observable<ItemApiResponse<Model>>
    {
        return this.apiService.post(this.path, model)
            .pipe(
                map(data => {
                    return {
                        getItem: () => this.convert(data.body.data),
                        getRaw: () => data.body
                    }
                })
            );
    }

    update(model: Model): Observable<ItemApiResponse<Model>>
    {
        return this.apiService.put(this.path, model)
            .pipe(
                map(data => {
                    return {
                        getItem: () => this.convert(data.body.data),
                        getRaw: () => data.body
                    }
                })
            );
    }

    delete(model: Model): Observable<ItemApiResponse<Model>>
    {
        return this.apiService.delete(this.path + '/' + model.id)
            .pipe(
                map(data => {
                    return {
                        getItem: () => this.convert(data.body.data),
                        getRaw: () => data.body
                    }
                })
            );
    }

    deleteById(id: number): Observable<ItemApiResponse<Model>>
    {
        return this.apiService.delete(this.path + '/' + id)
            .pipe(
                map(data => {
                    return {
                        getItem: () => this.convert(data.body.data),
                        getRaw: () => data.body
                    }
                })
            );
    }

    protected abstract convert(data: any): Model;
}
