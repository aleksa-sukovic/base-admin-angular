import { Resource } from 'src/app/@core/models/resource.model';

export class User extends Resource<User>
{
    public id: number;
    public full_name: string;
    public email: string;
    public gender: string;
    public birth_date: string;
    public group_id: number;

    protected initialize(data?: any): void
    {
        this.id = this.getIntValue('id', data);
        this.full_name = this.getStringValue('full_name', data);
        this.email = this.getStringValue('email', data);
        this.gender = this.getStringValue('gender', data);
        this.birth_date = this.getStringValue('birth_date', data);
        this.group_id = this.getIntValue('group_id', data);
    }
}
