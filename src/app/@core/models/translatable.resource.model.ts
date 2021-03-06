import { Resource } from './resource.model';

export abstract class TranslatableResource<Model, TranslationModel> extends Resource<Model>
{
    public translation: TranslationModel = this.initializeTranslation({});
    public translations: TranslationModel[] = [];

    constructor(data?: any)
    {
        super(data);

        if (data && data.translation) {
            this.translation = this.initializeTranslation(data.translation);
        }

        if (data && data.translations && data.translations.data) {
            this.initializeTranslations(data);
        }
    }

    protected abstract initialize(data?: any): void;
    protected abstract initializeTranslation(data?: any): TranslationModel;

    protected initializeTranslations(data?: any): void
    {
        for (let translationData of data.translations.data) {
            this.translations.push(this.initializeTranslation(translationData));
        }
    }
}
