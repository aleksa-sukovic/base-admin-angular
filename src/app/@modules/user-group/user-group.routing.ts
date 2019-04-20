import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGroupListComponent } from './components/list/user-group-list.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
    {
        path: 'user-groups',
        component: UserGroupListComponent,
        canActivate: [AuthGuard]
    }
];

export const UserGroupRoute: ModuleWithProviders = RouterModule.forChild(routes);
