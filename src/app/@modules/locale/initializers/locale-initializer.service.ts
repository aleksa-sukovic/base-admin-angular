import { Injectable } from '@angular/core';
import { LocaleService } from '../services/locale.service';
import { TranslatorService } from '../../../@core/services/translator.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LocaleInitializer
{
    constructor(private localeService: LocaleService, private http: HttpClient)
    {
        //
    }

    public init(): Promise<void>
    {
        return new Promise<void>(resolve => {
            this.localeService.all({ include: 'translation' }).subscribe(locales => {
                this.localeService.init(locales.getCollection());

                this.initTranslator(resolve);
            });
        });
    }

    protected initTranslator(resolve: any)
    {
        TranslatorService.init(LocaleService.current, this.http).then(() => {
            resolve();
        });
    }
}
