import { Component, ViewChild } from '@angular/core';
import {SidebarComponent} from './@shared/components/sidebar/sidebar.component';
import {RouterStateService} from './@core/services/router.state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    @ViewChild(SidebarComponent) protected sidebarComponent: SidebarComponent;

    constructor(private routerStateService: RouterStateService)
    {
       //
    }

    protected toggleSidebar(): boolean
    {
        this.sidebarComponent.toggle();

        return false;
    }

    protected onLanguageChange(): void
    {
        this.routerStateService.refresh();
    }
}
