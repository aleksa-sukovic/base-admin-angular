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

    public getDisplayName()
    {
        switch(this.name) {
            case 'super-admin': return 'Super Admin';
            case 'admin': return 'Admin';
            case 'editor': return 'Editor';
            case 'user': return 'User';
        }
    }
}