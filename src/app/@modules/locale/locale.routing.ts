import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocaleListComponent } from './components/list/locale.list.component';
import { LocaleResolver } from './resolvers/locale.resolver';

const routes: Routes = [
    {
        path: 'locales',
        component: LocaleListComponent
    }
];

export const LocaleRoute: ModuleWithProviders = RouterModule.forChild(routes);
