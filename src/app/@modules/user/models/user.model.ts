import { Resource } from 'src/app/@core/models/resource.model';
import { UserGroup } from '../../user-group/models/user-group.model';

export class User extends Resource<User>
{
    public id: number;
    public full_name: string;
    public email: string;
    public gender: string;
    public birth_date: string;
    public group_id: number;
    public group: UserGroup;

    protected initialize(data?: any): void
    {
        this.id = this.getIntValue('id', data);
        this.full_name = this.getStringValue('full_name', data);
        this.email = this.getStringValue('email', data);
        this.gender = this.getStringValue('gender', data);
        this.birth_date = this.getStringValue('birth_date', data);
        this.group = this.initializeGroup(data);
        this.group_id = this.group && this.group.id ? this.group.id : this.getIntValue('group_id', data);
    }

    protected initializeGroup(data?: any): UserGroup
    {
        if (!data || !data.group) {
            return null;
        }

        return new UserGroup(data.group);
    }

    public isAdmin(): boolean
    {
        return this.group && this.group.name === 'admin';
    }

    public isSuperAdmin(): boolean
    {
        return this.group && this.group.name === 'super-admin';
    }

    public isEditor(): boolean
    {
        return this.group && this.group.name === 'editor';
    }

    public isUser(): boolean
    {
        return this.group && this.group.name === 'user';
    }
}
