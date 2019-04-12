import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocaleListComponent } from './components/list/locale.list.component';
import { LocaleDetailsComponent } from './components/details/locale-details.component';
import { LocaleResolver } from './resolvers/locale.resolver';

const routes: Routes = [
    {
        path: 'locales',
        component: LocaleListComponent
    },
    {
        path: 'locales/add',
        component: LocaleDetailsComponent,
        resolve: {
            item: LocaleResolver
        }
    },
    {
        path: 'locales/:id',
        component: LocaleDetailsComponent,
        resolve: {
            item: LocaleResolver
        }
    }
];

export const LocaleRoute: ModuleWithProviders = RouterModule.forChild(routes);
