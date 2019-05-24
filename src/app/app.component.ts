import { Component, ViewChild, OnDestroy } from '@angular/core';
import { SidebarComponent } from './@shared/components/sidebar/sidebar.component';
import { AuthService } from './@modules/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy
{
    @ViewChild(SidebarComponent) protected sidebarComponent: SidebarComponent;
    protected loggedInSubscription: Subscription;
    protected isLoggedIn: boolean;

    constructor()
    {
        this.loggedInSubscription = AuthService.isLoggedInObservable.subscribe(value => this.isLoggedIn = value);
    }

    public ngOnDestroy(): void
    {
        this.loggedInSubscription.unsubscribe();
    }

    protected onToggleSidebar(): void
    {
        this.sidebarComponent.toggle();
    }
}
