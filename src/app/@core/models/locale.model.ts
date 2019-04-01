import { LocaleTranslation } from './locale.translation.model';
import { TranslatableResource } from './translatable.resource.model';

export class Locale extends TranslatableResource
{
    public id: number;
    public code: string;
    public translation: LocaleTranslation;
    public translations: LocaleTranslation[];

    protected initialize(data?: any): void
    {
        this.id = parseInt(data.id) || -1;
        this.code = data.code || '';
    }

    protected initializeTranslations(data?: any): void
    {
        //
    }
}
