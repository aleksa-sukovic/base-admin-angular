import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterStateService } from 'src/app/@core/services/router.state.service';

@Component({
  selector: 'reset-credentials',
  templateUrl: './reset-credentials.component.html',
  styleUrls: ['./reset-credentials.component.scss']
})
export class ResetCredentialsComponent
{
    protected form: FormGroup;
    protected passwordResetCode: string;
    protected semaphores: any;
    protected errors: any;

    constructor(formBuilder: FormBuilder, activatedRoute: ActivatedRoute, protected toastService: NbToastrService, protected authService: AuthService, protected routerState: RouterStateService)
    {
        this.form = formBuilder.group({
            password: ['', Validators.required],
            password_confirmation: ['', Validators.required]
        });

        this.passwordResetCode = activatedRoute.snapshot.paramMap.get('code');
        this.semaphores = {
            formSubmitted: false,
            loading: false,
            hasErrors: false
        };
    }

    protected onSubmit()
    {
        this.semaphores.formSubmitted = true;
        this.semaphores.loading = true;
        this.semaphores.hasErrors = false;

        if (this.form.invalid) {
            this.toastService.danger('Please correctly fill in all of the fields.', 'Validation exception');
            this.semaphores.loading = false;
            return;
        }

        this.authService.resetCredentials(this.passwordResetCode, {
            password: this.form.get('password').value,
            password_confirmation: this.form.get('password_confirmation').value
        }).subscribe(result => {
            if (result.success) {
                this.toastService.success('Success', 'You can now log in with your new credentials!');

                this.routerState.navigate(['login']);

                return;
            }

            this.toastService.danger('Failure', 'Please try again');
        }, (error) => {
            if (error.error && error.error.code == 'ValidationException') {
                this.errors = error.error.errors;
                this.semaphores.hasErrors = true;
                this.semaphores.loading = false;
            }
        });
    }
}
