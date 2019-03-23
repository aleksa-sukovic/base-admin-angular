import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from './@theme/theme.module';
import { AppRoute } from './app.routing';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoute,
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
