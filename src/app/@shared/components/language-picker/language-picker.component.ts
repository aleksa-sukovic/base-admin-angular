import {Component, EventEmitter, Output, Input} from '@angular/core';
import {Locale} from '../../../@modules/locale/models/locale.model';
import {LocaleService} from '../../../@modules/locale/services/locale.service';

@Component({
    selector: 'language-picker',
    templateUrl: './language-picker.component.html',
    styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent
{
    @Output() languageChange = new EventEmitter();

    protected selectedLocale: string;
    @Input() locales: Locale[];

    constructor(private localeService: LocaleService)
    {
        this.selectedLocale = localeService.current.code;
        this.locales = this.locales || this.localeService.available;
    }

    changeLanguage(): void
    {
        this.languageChange.emit({
            locale: this.locales.find(locale => locale.code == this.selectedLocale)
        });
    }
}
