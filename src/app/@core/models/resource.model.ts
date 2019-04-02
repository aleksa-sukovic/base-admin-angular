export abstract class Resource<Model>
{
    public id: number;
    public raw: any;

    constructor(data?: any)
    {
        this.initialize(data);

        this.raw = data;
    }

    protected getStringValue(key: string, data?: any): string
    {
        return this.getValue(key, data) || '';
    }

    protected getIntValue(key: string, data?: any): number
    {
        return parseInt(this.getValue(key, data)) || 0;
    }

    private getValue(key: string, data?: any): string
    {
        if (!data && !data[key]) {
            return null;
        }

        return data[key];
    }

    protected abstract initialize(data?: any): void;
}
