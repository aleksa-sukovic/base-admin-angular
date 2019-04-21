import { Injectable } from '@angular/core';
import { Locale } from 'src/app/@modules/locale/models/locale.model';
import { HttpClient } from '@angular/common/http';
import { LocaleService } from './locale.service';
import { Subscription, Observable, Observer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TranslatorService
{
    public data: any;

    private refreshObserver: Observer<{}>;
    public refresh: Observable<{}> = new Observable(observer => this.refreshObserver = observer);

    protected subscription: Subscription;

    constructor(private http: HttpClient, localeService: LocaleService)
    {
        this.subscription = localeService.currentStream.subscribe(locale => {
            this.init(locale).then(() => {
                this.refreshObserver.next({});
            });
        });
    }

    public get(key: string): any
    {
        return this.data[key] || key;
    }

    public init(locale: Locale): Promise<{}>
    {
        return new Promise<{}>(resolve => {
            const path = 'assets/lang/' + locale.code + '.json';

            this.http.get(path).subscribe(translation => {
                this.data = Object.assign({}, translation || {});

                resolve(this.data);
            }, () => {
                this.data = {};

                resolve(this.data);
            })
        });
    }
}
