import { LocaleTranslation } from './locale.translation.model';
import { TranslatableResource } from './translatable.resource.model';

export class Locale extends TranslatableResource<Locale, LocaleTranslation>
{
    public id: number;
    public code: string;
    public translation: LocaleTranslation;
    public translations: LocaleTranslation[];

    protected initialize(data?: any): void
    {
        this.id = this.getIntValue('id', data);
        this.code = this.getStringValue('code', data);
    }

    protected initializeTranslation(data?: any): LocaleTranslation
    {
        return new LocaleTranslation({
            id: this.getIntValue('id', data),
            name: this.getStringValue('name', data),
            locale_id: this.getIntValue('locale_id', data),
            locale_parent_id: this.getIntValue('locale_parent_id', data)
        });
    }
}
