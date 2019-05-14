import { Resource } from 'src/app/@core/models/resource.model';
import { TranslatorService } from '../../../@core/services/translator.service';

export class UserGroup extends Resource<UserGroup>
{
    public id: number;
    public name: string;

    constructor(data?: any)
    {
        super(data);
    }

    protected initialize(data?: any): void
    {
        this.id = this.getIntValue('id', data);
        this.name = this.getStringValue('name', data);
    }

    public getDisplayName()
    {
        switch(this.name) {
            case 'super-admin': return TranslatorService.get('groups.super-admin');
            case 'admin': return TranslatorService.get('groups.admin');
            case 'editor': return TranslatorService.get('groups.editor');
            case 'user': return TranslatorService.get('groups.user');
        }
    }
}
