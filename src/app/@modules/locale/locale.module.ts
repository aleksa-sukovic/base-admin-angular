import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocaleService } from './services/locale.service';
import { LocaleRoute } from './locale.routing';

@NgModule({
    declarations: [
        //
    ],
    imports: [
        RouterModule,
        LocaleRoute
    ],
    providers: [
        LocaleService
    ],
    exports: [
        //
    ]
})
export class LocaleModule
{
    //
}
