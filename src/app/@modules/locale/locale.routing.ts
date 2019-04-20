import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocaleListComponent } from './components/list/locale.list.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
    {
        path: 'locales',
        component: LocaleListComponent,
        canActivate: [AuthGuard]
    }
];

export const LocaleRoute: ModuleWithProviders = RouterModule.forChild(routes);
