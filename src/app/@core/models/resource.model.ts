export abstract class Resource
{
    protected raw: any;

    constructor(data?: any)
    {
        this.initialize(data);

        this.raw = data;
    }

    protected abstract initialize(data?: any): void;
}
