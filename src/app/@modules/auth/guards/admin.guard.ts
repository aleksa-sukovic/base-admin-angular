import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouterStateService } from 'src/app/@core/services/router.state.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate
{

    constructor(public auth: AuthService, public routerState: RouterStateService)
    {
        //
    }

    public canActivate(): boolean
    {
        if (!AuthService.isLoggedIn()) {
            this.routerState.navigate(['login']);

            return false;
        }

        if (!(AuthService.getUser().isSuperAdmin() || AuthService.getUser().isAdmin())) {
            this.routerState.navigate(['not-authorized']);

            return false;
        }

        return true;
    }
}
