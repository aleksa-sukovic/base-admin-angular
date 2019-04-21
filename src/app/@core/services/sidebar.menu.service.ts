import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AuthService } from 'src/app/@modules/auth/services/auth.service';
import { TranslatorService } from 'src/app/@modules/locale/services/translator.service';

@Injectable()
export class SidebarMenuService
{

    constructor(private translator: TranslatorService)
    {
        //
    }

    public getItems(): NbMenuItem[]
    {
        if (AuthService.isLoggedIn() && (AuthService.getUser().isSuperAdmin() || AuthService.getUser().isAdmin())) {
            return this.getAdminSidebar();
        }

        return this.getUserSidebar();
    }

    protected getAdminSidebar(): NbMenuItem[]
    {
        const items = this.defineItems();

        return [
            items.dashboard,
            items.locales,
            items.users,
            items.user_groups
        ];
    }

    protected getUserSidebar(): NbMenuItem[]
    {
        const items = this.defineItems();

        return [
            items.dashboard,
            items.locales,
            items.user_groups
        ];
    }

    private defineItems(): { [key: string]: NbMenuItem }
    {
        return {
            'dashboard': {
                title: this.translator.get('sidebar.dashboard.title'),
                expanded: false,
                icon: 'fas fa-tachometer-alt',
                link: '/dashboard'
            },
            'locales': {
                title: this.translator.get('sidebar.locales.title'),
                expanded: false,
                icon: 'fas fa-language',
                children: [
                    {
                        title: this.translator.get('sidebar.locales.list'),
                        link: '/locales'
                    }
                ]
            },
            'users': {
                title: this.translator.get('sidebar.users.title'),
                expanded: false,
                icon: 'fas fa-user',
                children: [
                    {
                        title: this.translator.get('sidebar.users.list'),
                        link: '/users'
                    },
                    {
                        title: this.translator.get('sidebar.users.details'),
                        link: '/users/add'
                    }
                ]
            },
            'user_groups': {
                title: this.translator.get('sidebar.user_groups.title'),
                expanded: false,
                icon: 'fas fa-users',
                children: [
                    {
                        title: this.translator.get('sidebar.user_groups.list'),
                        link: '/user-groups'
                    }
                ]
            }
        };
    }
}
