import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService
{
    protected apiBaseUrl: string;

    constructor(private http: HttpClient)
    {
        this.apiBaseUrl = environment.apiUrl;
    }

    public get(path: string, params?: any): Observable<HttpResponse<any>>
    {
        return this.http.get(this.getPath(path), {
            observe: 'response',
            params: this.makeParams(params)
        });
    }

    protected getPath(path: string)
    {
        if (path.indexOf('http') !== -1) {
            return path;
        }

        if (!path.startsWith('/')) {
            path = '/' + path;
        }

        return this.apiBaseUrl + path;
    }

    protected makeParams(params?: any): HttpParams
    {
        let httpParams = new HttpParams();

        if (params) {
            for (let key in params) {
                httpParams = httpParams.set(key, params[key]);
            }
        }

        return httpParams;
    }
}
