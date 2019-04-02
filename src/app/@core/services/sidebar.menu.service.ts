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
                children: [
                    {
                        title: 'View Dashboard',
                        link: '/dashboard'
                    }
                ]
            },
            {
                title: 'Locale',
                expanded: false,
                icon: 'fas fa-language',
                children: [
                    {
                        title: 'All Locales',
                        link: '/locales'
                    }
                ]
            }
        ];
    }
}
