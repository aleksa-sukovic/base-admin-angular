export abstract class Resource
{
    public id: number;
    public raw: any;

    constructor(data?: any)
    {
        this.initialize(data);

        this.raw = data;
    }

    protected getTranslationValue(key: string, data?: any): string
    {
        if (!data || !data.translation) {
            return '';
        }

        return this.getValue(key, data.translation);
    }

    protected getValue(key: string, data?: any): string
    {
        if (!data || !data[key]) {
            return '';
        }

        return data[key];
    }

    protected abstract initialize(data?: any): void;
}
