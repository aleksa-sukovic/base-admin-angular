import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
];

export const DashboardRoute: ModuleWithProviders = RouterModule.forChild(routes);
