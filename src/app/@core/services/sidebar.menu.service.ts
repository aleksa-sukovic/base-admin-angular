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
                link: '/dashboard',
                icon: 'fas fa-tachometer-alt'
            }
        ];
    }
}
