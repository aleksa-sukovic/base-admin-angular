import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocaleService
{
    public test(args: any)
    {
        console.log(args);
    }
}
