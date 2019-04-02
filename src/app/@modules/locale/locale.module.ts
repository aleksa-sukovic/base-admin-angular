import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocaleService } from './services/locale.service';
import { LocaleRoute } from './locale.routing';
import { LocaleList } from './components/list/locale.list.component';

@NgModule({
    declarations: [
        LocaleList
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
