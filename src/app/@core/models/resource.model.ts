export abstract class Resource
{
    public id: number;
    public raw: any;

    constructor(data?: any)
    {
        this.initialize(data);

        this.raw = data;
    }

    protected abstract initialize(data?: any): void;
}
