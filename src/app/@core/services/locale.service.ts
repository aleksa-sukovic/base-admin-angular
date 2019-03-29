import { Injectable, Injector } from '@angular/core';
import { ResourceService } from './resource.service';
import { Locale } from '../models/locale.model';

@Injectable({
    providedIn: 'root'
})
export class LocaleService extends ResourceService<Locale>
{
    public current: Locale;
    public available: Locale[];

    constructor(injector: Injector)
    {
        super('/locales', injector);
    }

    protected convert(data: any): Locale
    {
        return new Locale(data);
    }

    public setCurrent(locale: Locale): void
    {
        this.current = locale;
    }

    public getCurrent(): Locale
    {
        return this.current;
    }

    public init(locales: Locale[]): void
    {
        this.available = locales;

        let localeCode = localStorage.getItem('locale');
        if (!localeCode) {
            localeCode = 'en';
        }

        this.current = this.findByCode(localeCode) || new Locale({id: 1, code: 'en', name: ''});
        localStorage.setItem('locale', this.current.code);
    }

    protected findByCode(code: string): Locale
    {
        if (!this.available) {
            return null;
        }

       return this.available.find(locale => locale && locale.code == code);
    }
}
