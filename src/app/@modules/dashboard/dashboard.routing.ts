import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard.component';

const routes: Routes = [
    { path: 'dashboard', component: Dashboard },
];

export const DashboardRoute: ModuleWithProviders = RouterModule.forRoot(routes);
