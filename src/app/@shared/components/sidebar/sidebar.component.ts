import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import {SidebarMenuService} from '../../../@core/services/sidebar.menu.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/@modules/auth/services/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy
{
    protected items: NbMenuItem[];
    protected subscription: Subscription;
    protected isLoggedIn: boolean;

    constructor(private sidebarService: NbSidebarService, private sidebarMenuService: SidebarMenuService)
    {
        this.items = sidebarMenuService.getItems();
    }

    public toggle(): void
    {
        this.sidebarService.toggle(true);
    }

    ngOnInit(): void
    {
        this.subscription = AuthService.isLoggedInObservable.subscribe(state => {
            this.isLoggedIn = state;

            if (this.isLoggedIn) {
                this.items = this.sidebarMenuService.getItems();
            }
        });
    }

    ngOnDestroy(): void
    {
        this.subscription.unsubscribe();
    }
}
