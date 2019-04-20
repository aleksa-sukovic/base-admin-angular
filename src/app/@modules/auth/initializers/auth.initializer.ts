import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInitializer
{
    constructor(private authService: AuthService)
    {
        //
    }

    public init(): Promise<void>
    {
        return new Promise<void>(resolve => {
            this.authService.check().then(response => {
                resolve();
            });
        });
    }
}
