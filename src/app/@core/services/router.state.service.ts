import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QueryParamsHandling } from '@angular/router/src/config';

@Injectable({
    providedIn: 'root'
})
export class RouterStateService
{
    constructor(private router: Router, private route: ActivatedRoute)
    {
        //
    }

    public navigate(commands: any[], queryParams: any = {}, queryParamsHandling: QueryParamsHandling = ''): void
    {
        let params = this.parseQueryParams(queryParams);

        this.router.navigate(commands, {
            queryParams: params,
            queryParamsHandling: queryParamsHandling
        });
    }

    protected parseQueryParams(params: any): any
    {
        const queryParams = {};

        for (let param in params) {
            if (param && param.length) {
                queryParams[param] = params[param];
            }
        }

        return queryParams;
    }
}
