import { Component, Injector } from '@angular/core';
import { ResourceList } from 'src/app/@shared/components/resource-list/resource-list.component';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends ResourceList<User, UserService>
{
    protected baseUrl = 'users';
    protected apiIncludes = 'group';
    protected perPage = 10;

    constructor(injector: Injector)
    {
        super(injector);

        this.service = injector.get(UserService);
    }
}
