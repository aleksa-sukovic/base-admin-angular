import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterStateService } from 'src/app/@core/services/router.state.service';
import { NbToastrService } from '@nebular/theme';
import { TranslatorService } from 'src/app/@core/services/translator.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent
{
    protected email: string;
    protected password: string;
    protected semaphores: any;

    constructor(private authService: AuthService, private routerState: RouterStateService, private toastService: NbToastrService)
    {
        this.semaphores = {
            loading: false,
            formSubmitted: false
        };
    }

    protected submit(): void
    {
        this.semaphores.loading = true;
        this.semaphores.formSubmitted = true;

        this.authService.login(this.email, this.password).then(response => {
            if (response.success) {
                this.routerState.navigate(['dashboard']);

                return;
            }

            this.toastService.danger(TranslatorService.get('messages.check-input'), response.message);
            this.semaphores.loading = false;
        });
    }
}
