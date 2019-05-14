import { Component, Injector } from '@angular/core';
import { Validators, AbstractControl } from '@angular/forms';
import { Attribute } from 'src/app/@shared/components/resource-details/attribute.interface';
import { ResourceDetailsComponent } from 'src/app/@shared/components/resource-details/resource-details.component';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import * as moment from 'moment'
import { AuthService } from 'src/app/@modules/auth/services/auth.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent extends ResourceDetailsComponent<User, UserService>
{
    protected baseUrl = 'users';
    protected loggedInUser: User;
    protected authService: AuthService;

    constructor(injector: Injector)
    {
        super(injector);

        this.authService = injector.get(AuthService);
        this.resourceService = injector.get(UserService);
        this.loggedInUser = AuthService.getUser();
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
                apply: (field: AbstractControl) => {
                    this.resource.group_id = field.value.id;
                    this.resource.group = field.value;
                }
            }
        ];
    }

    protected onGroupSelected(group: any)
    {
        this.form.controls['group'].setValue(group);
    }

    protected requestCredentialsReset()
    {
        if (this.semaphores.loading) {
            return;
        }

        this.semaphores.loading = true;
        this.authService.requestCredentialsReset(this.resource).subscribe(result => {
            if (result.success) {
                this.showToast('Success', 'Please check your email.')
                this.semaphores.loading = false;

                return;
            }

            this.showToast('Failure', 'Please try again', NbToastStatus.DANGER);
            this.semaphores.loading = false;
        }, () => {
            this.showToast('Failure', 'Please try again.', NbToastStatus.DANGER);

            this.semaphores.loading = false;
        });
    }
}
