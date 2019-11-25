import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequiredExampleComponent } from './components/required-example/required-example.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
    { path: 'required-example', component: RequiredExampleComponent, canActivate: [AuthGuard] },
];

export const RequiredExampleRoute: ModuleWithProviders = RouterModule.forChild(routes);
