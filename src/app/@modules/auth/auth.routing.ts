import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { MissingPermissionPageComponent } from './components/missing-permissions-page/missing-permissions-page.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'not-authorized',
        component: MissingPermissionPageComponent
    }
];

export const AuthRoute: ModuleWithProviders = RouterModule.forChild(routes);
