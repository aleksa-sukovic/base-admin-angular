import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Injectable()
export class SidebarMenuService
{
    public getItems(): NbMenuItem[]
    {
        return [
            {
                title: 'Dashboard',
                expanded: false,
                icon: 'fas fa-tachometer-alt',
                link: '/dashboard'
            },
            {
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
            {
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
            {
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
        ];
    }
}
