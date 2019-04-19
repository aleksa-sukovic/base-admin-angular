import { Resource } from 'src/app/@core/models/resource.model';

export class UserGroup extends Resource<UserGroup>
{
    public id: number;
    public name: string;

    protected initialize(data?: any): void
    {
        this.id = this.getIntValue('id', data);
        this.name = this.getStringValue('name', data);
    }
}
