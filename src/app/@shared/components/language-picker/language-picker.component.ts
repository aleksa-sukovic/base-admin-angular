import {Component, EventEmitter, Output} from '@angular/core';
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
    protected locales: Locale[];

    constructor(private localeService: LocaleService)
    {
        this.selectedLocale = localeService.current.code;
        this.locales = this.localeService.available;
    }

    changeLanguage(): void
    {
        this.localeService.setCurrentByCode(this.selectedLocale);

        this.localeService.all({include: 'translation'}).subscribe(data => {
            this.localeService.init(data.getCollection());

            this.locales = data.getCollection();

            this.languageChange.emit(this.localeService.current);
        });
    }
}
