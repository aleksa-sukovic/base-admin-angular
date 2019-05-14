import { Resource } from '../models/resource.model';

export interface CollectionApiResponse<Model extends Resource<Model>>
{
    getCollection(): Model[];
    getRaw(): any;
}
