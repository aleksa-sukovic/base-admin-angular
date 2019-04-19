import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocaleService } from './services/locale.service';
import { LocaleRoute } from './locale.routing';
import { LocaleListComponent } from './components/list/locale.list.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedModule } from 'src/app/@shared/shared.module';
import { LocaleResolver } from './resolvers/locale.resolver';
import { LocaleInitializer } from './initializers/locale-initializer.service';

export function initializeLocales(initializer: LocaleInitializer)
{
    return (): Promise<void> => initializer.init();
}

@NgModule({
    declarations: [
        LocaleListComponent,
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
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: LocaleModule,
            providers: [
                LocaleService,
                {
                    provide: APP_INITIALIZER,
                    useFactory: initializeLocales,
                    deps: [LocaleInitializer, LocaleService],
                    multi: true
                }
            ]
        };
    }
}
