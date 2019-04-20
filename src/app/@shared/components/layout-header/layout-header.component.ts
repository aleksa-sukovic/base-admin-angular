import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/@modules/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/@modules/user/models/user.model';
import { RouterStateService } from 'src/app/@core/services/router.state.service';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';
import { LocaleService } from 'src/app/@modules/locale/services/locale.service';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit, OnDestroy
{
    @Output() toggleSidebar = new EventEmitter;
    @Output() languageChange = new EventEmitter;

    @ViewChild(LanguagePickerComponent) protected languagePickerComponent: LanguagePickerComponent;
    @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

    protected isLoggedInSubscription: Subscription;
    protected languageChangeSubscription: Subscription;
    protected isLoggedIn: boolean;
    protected user: User;

    constructor(protected authService: AuthService, protected routerState: RouterStateService, protected localeService: LocaleService)
    {
        this.user = AuthService.getUser();
    }

    public ngOnInit(): void
    {
        this.isLoggedInSubscription = AuthService.isLoggedInObservable.subscribe(loggedIn => this.isLoggedIn = loggedIn);
    }

    public ngOnDestroy(): void
    {
        this.isLoggedInSubscription.unsubscribe();

        if (this.languageChangeSubscription) {
            this.languageChangeSubscription.unsubscribe();
        }
    }

    protected onToggleSidebar(): void
    {
        this.toggleSidebar.emit();
    }

    protected logOut(): void
    {
        this.authService.logout();

        this.routerState.navigate(['login']);
    }

    protected viewProfile(): void
    {
        this.routerState.navigate(['users', this.user.id]);

        this.popover.hide();
    }

    protected onLanguageChange(event: any): void
    {
        this.localeService.setCurrent(event.locale);

        this.languageChangeSubscription = this.localeService.all({include: 'translation,translations'}).subscribe(data => {
            this.localeService.init(data.getCollection());

            this.languagePickerComponent.locales = data.getCollection();
        });
    }
}
