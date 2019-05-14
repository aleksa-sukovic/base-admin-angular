import { Injectable, Injector } from '@angular/core';
import { ResourceService } from 'src/app/@core/services/resource.service';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService extends ResourceService<User>
{
    constructor(injector: Injector)
    {
        super('/users', injector);
    }

    protected convert(data: any): User
    {
        return new User(data);
    }
}
