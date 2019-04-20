import { ApiService } from '../../../@core/services/api.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/@modules/user/models/user.model';
import { Observer, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService
{
    private static user: User;
    private static isUserLoggedIn: boolean;
    private static isLoggedInObserver: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public static isLoggedInObservable = AuthService.isLoggedInObserver.asObservable();

    constructor(private apiService: ApiService)
    {
        //
    }

    public async check(): Promise<{ [key: string]: boolean }>
    {
        if (!AuthService.hasToken()) {
            return Promise.resolve({ authenticated: false });
        }

        try {
            const httpResponse = await this.apiService.post('auth/refresh').toPromise();
            let responseData = httpResponse.body.data;

            localStorage.setItem('access_token', responseData.token);
            this.setUser(responseData.user);

            return Promise.resolve({ authenticated: true });
        } catch (error) {
            return Promise.resolve({ authenticated: false });
        }
    }

    public async login(email: string, password: string): Promise<{ [key: string]: boolean }>
    {
        try {
            const httpResponse = await this.apiService.post('auth/login', { email, password }).toPromise();
            let responseData = httpResponse.body.data;

            localStorage.setItem('access_token', responseData.token);
            this.setUser(responseData.user);

            return Promise.resolve({ success: true });
        } catch (error) {
            return Promise.resolve({ success: false, message: error.error.message });
        }
    }

    public logout(): void
    {
        localStorage.removeItem('access_token');
        AuthService.user = null;

        AuthService.isUserLoggedIn = false;
        AuthService.isLoggedInObserver.next(false);
    }

    protected setUser(userData: any)
    {
        AuthService.user = new User(userData);
        AuthService.isUserLoggedIn = true;
        AuthService.isLoggedInObserver.next(true);
    }

    public static getUser(): User
    {
        return AuthService.user;
    }

    public static isLoggedIn()
    {
        return AuthService.isUserLoggedIn;
    }

    public static getToken()
    {
        return localStorage.getItem('access_token');
    }

    public static hasToken()
    {
        return AuthService.getToken() != null;
    }
}
