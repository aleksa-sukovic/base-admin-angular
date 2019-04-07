import { Component } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import {SidebarMenuService} from '../../../@core/services/sidebar.menu.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent
{
    protected items: NbMenuItem[]

    constructor(private sidebarService: NbSidebarService, sidebarMenuService: SidebarMenuService)
    {
        this.items = sidebarMenuService.getItems();
    }

    public toggle(): void
    {
        this.sidebarService.toggle(true);
    }
}