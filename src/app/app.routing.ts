import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFound } from './@shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: PageNotFound },
];

export const AppRoute: ModuleWithProviders = RouterModule.forRoot(routes);
