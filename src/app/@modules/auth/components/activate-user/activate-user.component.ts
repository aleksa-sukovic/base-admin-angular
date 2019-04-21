import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterStateService } from 'src/app/@core/services/router.state.service';

@Component({
  selector: 'activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent
{
    protected form: FormGroup;
    protected activateCode: string;
    protected semaphores: any;

    constructor(formBuilder: FormBuilder, activatedRoute: ActivatedRoute, protected toastService: NbToastrService, protected authService: AuthService, protected routerState: RouterStateService)
    {
        this.form = formBuilder.group({
            password: ['', Validators.required],
            password_confirmation: ['', Validators.required]
        });

        this.activateCode = activatedRoute.snapshot.paramMap.get('code');
        this.semaphores = {
            formSubmitted: false,
            loading: false
        };
    }

    protected onSubmit()
    {
        this.semaphores.formSubmitted = true;
        this.semaphores.loading = true;

        if (this.form.invalid) {
            this.toastService.danger('Please correctly fill in all of the fields!', 'Validation exception');

            return;
        }

        if (this.form.get('password').value !== this.form.get('password_confirmation').value) {
            this.toastService.danger('Passwords do not match!', 'Validation exception');

            return;
        }

        this.authService.activate(this.activateCode, this.form.get('password').value, this.form.get('password_confirmation').value).subscribe(value => {
            if (value.activated) {
                this.toastService.success('Success', 'Your account has been activated!');

                this.routerState.navigate(['login']);

                return;
            }

            this.toastService.danger('Failuer', 'Please try again');
        });
    }
}
