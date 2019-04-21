import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MissingPermissionPageComponent } from './components/missing-permissions-page/missing-permissions-page.component';
import { ActivateUserComponent } from './components/activate-user/activate-user.component';
import { ResetCredentialsComponent } from './components/reset-credentials/reset-credentials.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'not-authorized',
        component: MissingPermissionPageComponent
    },
    {
        path: 'activate/:code',
        component: ActivateUserComponent
    },
    {
        path: 'reset-credentials/:code',
        component: ResetCredentialsComponent
    }
];

export const AuthRoute: ModuleWithProviders = RouterModule.forChild(routes);
