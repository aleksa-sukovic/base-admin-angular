import { Injectable, Injector } from '@angular/core';
import { ResourceService } from 'src/app/@core/services/resource.service';
import { UserGroup } from '../models/user-group.model';

@Injectable({
    providedIn: 'root'
})
export class UserGroupService extends ResourceService<UserGroup>
{
    constructor(injector: Injector)
    {
        super('/user-groups', injector);
    }

    protected convert(data: any): UserGroup
    {
        return new UserGroup(data);
    }
}
