import { Injectable, Injector } from "@angular/core";
import { ResourceResolver } from 'src/app/@shared/resolvers/resource.resolver';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable()
export class UserResolver extends ResourceResolver<User, UserService>
{
    protected apiIncludes = 'group';

    constructor(injector: Injector)
    {
        super(injector);

        this.resourceService = injector.get(UserService);
    }

    makeDefaultInstance(): User
    {
        return new User({});
    }
}
