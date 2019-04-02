import { Injectable } from '@angular/core';
import { LocaleService } from '../../@modules/locale/services/locale.service';

@Injectable({
    providedIn: 'root'
})
export class Initializer
{
    constructor(private localeService: LocaleService)
    {
        //
    }

    public init(): Promise<void>
    {
        return new Promise<void>(resolve => {
            this.localeService.all({ include: 'translation' }).subscribe(locales => {
                this.localeService.init(locales);

                resolve();
            });
        });
    }
}
