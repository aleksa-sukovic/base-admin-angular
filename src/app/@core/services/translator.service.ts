import { Injectable } from '@angular/core';
import { Locale } from 'src/app/@modules/locale/models/locale.model';
import { HttpClient } from '@angular/common/http';
import { LocaleService } from '../../@modules/locale/services/locale.service';
import { Subscription, Observable, Observer, BehaviorSubject } from 'rxjs';

@Injectable()
export class TranslatorService
{
    protected static data: any;

    private static refreshObserver: BehaviorSubject<any> = new BehaviorSubject<any>({});
    public static refresh: Observable<any> = TranslatorService.refreshObserver.asObservable();

    constructor(private http: HttpClient, localeService: LocaleService)
    {
        localeService.currentStream.subscribe(locale => {
            TranslatorService.init(locale, http).then(() => {
                TranslatorService.refreshObserver.next({});
            });
        });
    }

    public get(key: string): any
    {
        return TranslatorService.data[key] || key;
    }

    public static get(key: string): any
    {
        return TranslatorService.data[key] || key;
    }

    public static init(locale: Locale, http: HttpClient): Promise<{}>
    {
        return new Promise<{}>(resolve => {
            const path = 'assets/lang/' + locale.code + '.json';

            http.get(path).subscribe(translation => {
                TranslatorService.data = Object.assign({}, translation || {});

                resolve(TranslatorService.data);
            }, () => {
                TranslatorService.data = {};

                resolve(TranslatorService.data);
            })
        });
    }
}
