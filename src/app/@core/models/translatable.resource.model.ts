import { Resource } from './resource.model';

export abstract class TranslatableResource extends Resource
{
    protected abstract initialize(data?: any): void;
    protected abstract initializeTranslations(data?: any): void;
}
