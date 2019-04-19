import { Component, Injector } from '@angular/core';
import { Validators, AbstractControl } from '@angular/forms';
import { Attribute } from 'src/app/@shared/components/resource-details/attribute.interface';
import { ResourceDetailsComponent } from 'src/app/@shared/components/resource-details/resource-details.component';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import * as moment from 'moment'

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent extends ResourceDetailsComponent<User, UserService>
{
    protected baseUrl = 'users';

    constructor(injector: Injector)
    {
        super(injector);

        this.resourceService = injector.get(UserService);
    }

    protected initResource(user: User): User
    {
        if (!user.gender) {
            user.gender = 'm';
        }

        return user;
    }

    protected getFillable(): Attribute[]
    {
        return [
            {
                name: 'full_name',
                validator: Validators.required,
                apply: (field) => {
                    return field.value;
                }
            },
            {
                name: 'email',
                validator: [Validators.required, Validators.email]
            },
            {
                name: 'birth_date',
                validator: [],
                init: (value: any) => {
                    if (value) {
                        return new Date(value);
                    }

                    return new Date();
                },
                apply: (field) => moment(field.value).format('YYYY-MM-DD') + ' 12:00:00'
            },
            {
                name: 'gender',
                validator: Validators.required
            },
            {
                name: 'group',
                validator: Validators.required,
                apply: (field: AbstractControl) => this.resource.group_id = field.value
            }
        ];
    }

    protected onGroupSelected(group: any)
    {
        this.form.controls['group'].setValue(group.id);
    }
}
