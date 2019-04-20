import { Component, ViewChild, OnDestroy } from '@angular/core';
import { SidebarComponent } from './@shared/components/sidebar/sidebar.component';
import { RouterStateService } from './@core/services/router.state.service';
import { LocaleService } from './@modules/locale/services/locale.service';
import { LanguagePickerComponent } from './@shared/components/language-picker/language-picker.component';
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
    @ViewChild(LanguagePickerComponent) protected languagePickerComponent: LanguagePickerComponent;
    protected isLoggedIn: boolean;
    protected isLoggedInSubscription: Subscription;

    constructor(private localeService: LocaleService, private routerStateService: RouterStateService, private authService: AuthService)
    {
        this.isLoggedIn = AuthService.isLoggedIn();

        this.isLoggedInSubscription = AuthService.isLoggedInObservable.subscribe(loggedIn => this.isLoggedIn = loggedIn);
    }

    public ngOnDestroy(): void
    {
        this.isLoggedInSubscription.unsubscribe();
    }

    protected toggleSidebar(): void
    {
        this.sidebarComponent.toggle();
    }

    protected onLanguageChange(event: any): void
    {
        this.localeService.setCurrent(event.locale);

        this.localeService.all({include: 'translation,translations'}).subscribe(data => {
            this.localeService.init(data.getCollection());

            this.languagePickerComponent.locales = data.getCollection();
        });

    }

    protected logOut(): void
    {
        this.authService.logout();
        this.routerStateService.navigate(['login']);
    }
}
