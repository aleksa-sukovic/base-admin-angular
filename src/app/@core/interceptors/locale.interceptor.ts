import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocaleService} from '../../@modules/locale/services/locale.service';
import {Injectable} from '@angular/core';

@Injectable()
export class LocaleInterceptor implements HttpInterceptor
{
    constructor(private localeService: LocaleService)
    {
        //
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        const headers = this.getHeaders();

        request = request.clone({
            setHeaders: headers
        });

        return next.handle(request);
    }

    protected getHeaders(): any
    {
        if (LocaleService.current) {
            return { locale: LocaleService.current.code };
        }

        if (localStorage.getItem('locale')) {
            return { locale: localStorage.getItem('locale') };
        }

        return {};
    }
}
