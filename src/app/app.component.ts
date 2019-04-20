import { Component, ViewChild, OnDestroy } from '@angular/core';
import { SidebarComponent } from './@shared/components/sidebar/sidebar.component';
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

    constructor(private localeService: LocaleService)
    {
        //
    }

    protected onToggleSidebar(): void
    {
        this.sidebarComponent.toggle();
    }
}
