import { Component, Injector } from '@angular/core';
import { ResourceList } from 'src/app/@shared/components/resource-list/resource-list.component';
import { UserGroup } from '../../models/user-group.model';
import { UserGroupService } from '../../services/user-group.service';

@Component({
    selector: 'user-group-list',
    templateUrl: './user-group-list.component.html',
    styleUrls: ['./user-group-list.component.scss']
})
export class UserGroupListComponent extends ResourceList<UserGroup, UserGroupService>
{
    protected baseUrl = 'user-groups';
    protected perPage = 10;

    constructor(injector: Injector)
    {
        super(injector);

        this.service = injector.get(UserGroupService);
    }
}
