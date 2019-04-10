import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocaleService } from './services/locale.service';
import { LocaleRoute } from './locale.routing';
import { LocaleListComponent } from './components/list/locale.list.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedModule } from 'src/app/@shared/shared.module';
import { LocaleDetailsComponent } from './components/details/locale-details.component';
import { LocaleResolver } from './resolvers/locale.resolver';

@NgModule({
    declarations: [
        LocaleListComponent,
        LocaleDetailsComponent
    ],
    imports: [
        RouterModule,
        LocaleRoute,
        ThemeModule,
        SharedModule,
        RouterModule
    ],
    providers: [
        LocaleService,
        LocaleResolver
    ],
    exports: [
        //
    ]
})
export class LocaleModule
{
    //
}
