import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RouterStateService
{
    public queryParams: any;

    constructor(private router: Router)
    {
        this.queryParams = {};
    }

    public navigate(commands: any[], clearParams: boolean = false): void
    {
        if (clearParams) {
            this.resetQueryParams();
        }

        this.router.navigate(commands, {
            queryParams: this.parseQueryParams(),
            queryParamsHandling: ''
        });
    }

    public refresh(): void
    {
        this.router.navigate([ this.router.url.split('?')[0] ], {
            queryParams: this.parseQueryParams(),
            queryParamsHandling: ''
        });
    }

    protected parseQueryParams(): any
    {
        const params = {};

        for (const key in this.queryParams) {
            if (parseInt(this.queryParams[key], 10) || parseInt(this.queryParams[key], 10) === 0) {
                params[key] = this.queryParams[key];
            } else if (this.queryParams[key] && this.queryParams[key].length) {
                params[key] = this.queryParams[key];
            }
        }

        return params;
    }

    public addQueryParams(params: any): void
    {
        for (const key in params) {
            this.queryParams[key] = params[key];
        }
    }

    public resetQueryParams(): void
    {
        this.queryParams = {};
    }
}
