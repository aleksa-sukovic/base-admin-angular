import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from './@theme/theme.module';
import { AppRoute } from './app.routing';
import { CoreModule } from './@core/core.module';
import { SharedModule } from './@shared/shared.module';
import { DashboardModule } from './@modules/dashboard/dashboard.module';
import { LocaleModule } from './@modules/locale/locale.module';
import { UserModule } from './@modules/user/user.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        // App
        AppRoute,

        // Core and Shared
        CoreModule.forRoot(),
        SharedModule,

        // Custom
        DashboardModule,
        LocaleModule,
        UserModule,

        // 3rd party
        BrowserModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({name: 'corporate'}),
        NbLayoutModule,
        ThemeModule.forRoot(),
        ThemeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
