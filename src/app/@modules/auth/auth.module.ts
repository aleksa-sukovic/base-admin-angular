import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInitializer } from './initializers/auth.initializer';
import { LoginComponent } from './components/login/login.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { AuthRoute } from './auth.routing';
import { MissingPermissionPageComponent } from './components/missing-permissions-page/missing-permissions-page.component';
import { ActivateUserComponent } from './components/activate-user/activate-user.component';
import { ResetCredentialsComponent } from './components/reset-credentials/reset-credentials.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { LocaleModule } from '../locale/locale.module';
import { CoreModule } from 'src/app/@core/core.module';

export function initializeAuth(initializer: AuthInitializer)
{
    return (): Promise<void> => initializer.init();
}

@NgModule({
    declarations: [
        LoginComponent,
        MissingPermissionPageComponent,
        ActivateUserComponent,
        ResetCredentialsComponent
    ],
    imports: [
        ThemeModule,
        AuthRoute,
        SharedModule,
        LocaleModule,
        CoreModule
    ],
    exports: [
        LoginComponent,
        ActivateUserComponent,
        ResetCredentialsComponent
    ],
    providers: [
        //
    ]
})
export class AuthModule
{
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: AuthModule,
            providers: [
                AuthService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: TokenInterceptor,
                    multi: true
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: initializeAuth,
                    deps: [AuthInitializer, AuthService],
                    multi: true
                }
            ]
        };
    }
}
