import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserResolver } from './resolvers/user.resolver';
import { UserListComponent } from './components/list/user-list.component';
import { UserDetailsComponent } from './components/details/user-details.component';
import { AdminGuard } from '../auth/guards/admin.guard';

const routes: Routes = [
    {
        path: 'users',
        component: UserListComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'users/add',
        component: UserDetailsComponent,
        canActivate: [AdminGuard],
        resolve: {
            item: UserResolver
        }
    },
    {
        path: 'users/:id',
        component: UserDetailsComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [AdminGuard],
        resolve: {
            item: UserResolver
        }
    }
];

export const LocaleRoute: ModuleWithProviders = RouterModule.forChild(routes);
