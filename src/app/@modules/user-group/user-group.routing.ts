import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGroupListComponent } from './components/list/user-group-list.component';

const routes: Routes = [
    {
        path: 'user-groups',
        component: UserGroupListComponent
    }
];

export const UserGroupRoute: ModuleWithProviders = RouterModule.forChild(routes);
