import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './@shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', component: PageNotFoundComponent },
];

export const AppRoute: ModuleWithProviders = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
