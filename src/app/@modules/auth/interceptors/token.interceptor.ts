import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor
{

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
        if (AuthService.hasToken()) {
            return { 'al-access-token': AuthService.getToken() }
        }

        return {};
    }
}
