import { Component, ViewChild } from '@angular/core';
import { Sidebar } from './@core/components/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    @ViewChild(Sidebar) protected sidebarComponent: Sidebar;

    constructor()
    {
       //
    }

    protected toggleSidebar(): boolean
    {
        this.sidebarComponent.toggle();

        return false;
    }
}
