import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from './@theme/theme.module';
import { AppRoute } from './app.routing';
import { CoreModule } from './@core/core.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        // App
        AppRoute,

        // Core and Shared
        CoreModule,

        // 3rd party
        BrowserModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: 'corporate' }),
        ThemeModule.forRoot(),
        NbLayoutModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
