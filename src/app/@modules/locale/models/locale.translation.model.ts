import { Resource } from '../../../@core/models/resource.model';

export class LocaleTranslation extends Resource<LocaleTranslation>
{
    public id: number;
    public locale_parent_id: number;
    public locale_id: number;
    public name: string;

    protected initialize(data?: any): void
    {
        this.id = parseInt(data.id) || null;
        this.locale_parent_id = parseInt(data.locale_parent_id) || null;
        this.locale_id = parseInt(data.locale_id) || null;
        this.name = this.getName(data);
    }

    protected getName(data?: any): string
    {
        if (!data || !data.name) {
            return '';
        }

        return data.name;
    }
}
