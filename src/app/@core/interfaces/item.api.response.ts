import { Resource } from '../models/resource.model';

export interface ItemApiResponse<Model extends Resource<Model>>
{
    getItem(): Model;
    getRaw(): any;
}
