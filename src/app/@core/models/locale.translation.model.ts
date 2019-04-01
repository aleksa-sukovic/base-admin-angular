import { Resource } from './resource.model';

export class LocaleTranslation extends Resource
{
    public id: number;
    public locale_parent_id: number;
    public locale_id: number;
    public name: string;

    protected initialize(data?: any): void
    {
        this.id = parseInt(data.id) || -1;
        this.locale_parent_id = parseInt(data.locale_parent_id) || -1;
        this.locale_id = parseInt(data.locale_id) || -1;
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
