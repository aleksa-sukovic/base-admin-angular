import { Injectable, Injector } from '@angular/core';
import { ResourceService } from '../../../@core/services/resource.service';
import { Locale } from '../models/locale.model';
import { Observable, Observer } from 'rxjs';
import { TranslatedResourceService } from 'src/app/@core/services/translated-resource.service';
import { LocaleTranslation } from '../models/locale.translation.model';

@Injectable({
    providedIn: 'root'
})
export class LocaleService extends TranslatedResourceService<Locale, LocaleTranslation>
{
    public current: Locale;
    public available: Locale[];

    private currentObserver: Observer<Locale>;
    private availableObserver: Observer<Locale[]>;
    public currentStream: Observable<Locale> = new Observable(observer => this.currentObserver = observer);
    public availableStream: Observable<Locale[]> = new Observable(observer => this.availableObserver = observer);

    constructor(injector: Injector)
    {
        super('/locales', injector);
    }

    protected convert(data: any): Locale
    {
        return new Locale(data);
    }

    protected convertTranslation(data: any): LocaleTranslation
    {
        return new LocaleTranslation(data);
    }

    public setCurrent(locale: Locale): void
    {
        this.current = locale;

        localStorage.setItem('locale', locale.code);

        this.notifySubscribers(this.currentObserver, this.current);
    }

    public setCurrentByCode(code: string): void
    {
        const found = this.available.find(data => data.code === code);

        if (found) {
            this.setCurrent(found);
        }
    }

    public init(locales: Locale[]): void
    {
        this.available = locales;

        let localeCode = localStorage.getItem('locale') || 'en';

        this.current = this.findByCode(localeCode) || new Locale({id: 1, code: 'en', name: ''});
        localStorage.setItem('locale', this.current.code);

        this.notifySubscribers(this.availableObserver, this.available);
    }

    protected findByCode(code: string): Locale
    {
        if (!this.available) {
            return null;
        }

       return this.available.find(locale => locale && locale.code == code);
    }

    protected notifySubscribers(observer: Observer<any>, data: any): void
    {
        if (observer != null) {
            observer.next(data);
        }
    }
}
