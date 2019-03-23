import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

    public get(path: string): Observable<HttpResponse<any>>
    {
        return this.http.get(this.getPath(path), { observe: 'response' });
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
}
