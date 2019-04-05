import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocaleService } from './services/locale.service';
import { LocaleRoute } from './locale.routing';
import { LocaleList } from './components/list/locale.list.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedModule } from 'src/app/@shared/shared.module';

@NgModule({
    declarations: [
        LocaleList
    ],
    imports: [
        RouterModule,
        LocaleRoute,
        ThemeModule,
        SharedModule,
        RouterModule
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
