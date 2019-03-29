import { Resource } from './resource.model';

export class Locale extends Resource
{
    public id: number;
    public code: string;
    public name: string;

    protected initialize(data?: any): void
    {
        this.id = parseInt(data.id) || -1;
        this.code = data.code || '';
        this.name = this.getName(data);
    }

    protected getName(data?: any): string
    {
        if (!data || !data.translation) {
            return '';
        }

        return data.translation.name;
    }
}
