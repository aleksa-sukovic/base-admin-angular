import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserResolver } from './resolvers/user.resolver';
import { UserListComponent } from './components/list/user-list.component';
import { UserDetailsComponent } from './components/details/user-details.component';

const routes: Routes = [
    {
        path: 'users',
        component: UserListComponent
    },
    {
        path: 'users/add',
        component: UserDetailsComponent,
        resolve: {
            item: UserResolver
        }
    },
    {
        path: 'users/:id',
        component: UserDetailsComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
            item: UserResolver
        }
    }
];

export const LocaleRoute: ModuleWithProviders = RouterModule.forChild(routes);
