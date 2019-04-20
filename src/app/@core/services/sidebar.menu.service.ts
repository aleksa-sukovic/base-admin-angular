import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AuthService } from 'src/app/@modules/auth/services/auth.service';

@Injectable()
export class SidebarMenuService
{

    public getItems(): NbMenuItem[]
    {
        if (AuthService.isLoggedIn() && (AuthService.getUser().isSuperAdmin() || AuthService.getUser().isAdmin())) {
            return this.getAdminSidebar();
        }

        return this.getUserSidebar();
    }

    protected getAdminSidebar(): NbMenuItem[]
    {
        return [
            this.items.dashboard,
            this.items.locales,
            this.items.users,
            this.items.user_groups
        ];
    }

    protected getUserSidebar(): NbMenuItem[]
    {
        return [
            this.items.dashboard,
            this.items.locales,
            this.items.user_groups
        ];
    }

    private items: { [key: string]: NbMenuItem } = {
        'dashboard': {
            title: 'Dashboard',
            expanded: false,
            icon: 'fas fa-tachometer-alt',
            link: '/dashboard'
        },
        'locales': {
            title: 'Locales',
            expanded: false,
            icon: 'fas fa-language',
            children: [
                {
                    title: 'All Locales',
                    link: '/locales'
                }
            ]
        },
        'users': {
            title: 'Users',
            expanded: false,
            icon: 'fas fa-user',
            children: [
                {
                    title: 'All Users',
                    link: '/users'
                },
                {
                    title: 'Add User',
                    link: '/users/add'
                }
            ]
        },
        'user_groups': {
            title: 'User Groups',
            expanded: false,
            icon: 'fas fa-users',
            children: [
                {
                    title: 'All User groups',
                    link: '/user-groups'
                }
            ]
        }
    }
}
