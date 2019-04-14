import { Injectable } from '@angular/core';
import { TranslatableResource } from '../models/translatable.resource.model';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { ItemApiResponse } from '../interfaces/item.api.response';
import { map } from 'rxjs/operators';
import { Resource } from '../models/resource.model';

@Injectable({
    providedIn: 'root'
})
export abstract class TranslatedResourceService< Model extends TranslatableResource<Model, ModelTranslation>, ModelTranslation extends Resource<ModelTranslation> >
    extends ResourceService<Model>
{
    protected abstract convertTranslation(data: any): ModelTranslation;

    deleteTranslation(model: Model): Observable<ItemApiResponse<ModelTranslation>>
    {
        return this.apiService.delete(this.path + '/' + model.id + '/translation')
            .pipe(
                map(data => {
                    return {
                        getItem: () => this.convertTranslation(data.body.data),
                        getRaw: () => data.body
                    }
                })
            );
    }
}
