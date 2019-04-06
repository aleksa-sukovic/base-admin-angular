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

    public navigate(commands: any[]): void
    {
        let params = this.parseQueryParams();

        this.router.navigate(commands, {
            queryParams: params,
            queryParamsHandling: ''
        });
    }

    protected parseQueryParams(): any
    {
        let params = {};

        for (let key in this.queryParams) {
            if (parseInt(this.queryParams[key]) || parseInt(this.queryParams[key]) == 0) {
                params[key] = this.queryParams[key];
            } else if (this.queryParams[key] && this.queryParams[key].length) {
                params[key] = this.queryParams[key];
            }
        }

        return params;
    }
}
