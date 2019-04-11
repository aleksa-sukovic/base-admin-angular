import { Component, ViewChild } from '@angular/core';
import {SidebarComponent} from './@shared/components/sidebar/sidebar.component';
import {RouterStateService} from './@core/services/router.state.service';
import { LocaleService } from './@modules/locale/services/locale.service';
import { LanguagePickerComponent } from './@shared/components/language-picker/language-picker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    @ViewChild(SidebarComponent) protected sidebarComponent: SidebarComponent;
    @ViewChild(LanguagePickerComponent) protected languagePickerComponent: LanguagePickerComponent;

    constructor(private localeService: LocaleService, private routerStateService: RouterStateService)
    {
       //
    }

    protected toggleSidebar(): boolean
    {
        this.sidebarComponent.toggle();

        return false;
    }

    protected onLanguageChange(event: any): void
    {
        this.localeService.setCurrent(event.locale);

        this.localeService.all({include: 'translation,translations'}).subscribe(data => {
            this.localeService.init(data.getCollection());

            this.languagePickerComponent.locales = data.getCollection();

            this.routerStateService.refresh();
        });

    }
}
