import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocaleService } from './services/locale.service';
import { LocaleRoute } from './locale.routing';
import { LocaleListComponent } from './components/list/locale.list.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedModule } from 'src/app/@shared/shared.module';
import { LocaleResolver } from './resolvers/locale.resolver';
import { LocaleInitializer } from './initializers/locale-initializer.service';
import { TranslatorService } from './services/translator.service';
import { TranslatorPipe } from './pipes/translator.pipe';

export function initializeLocales(initializer: LocaleInitializer)
{
    return (): Promise<void> => initializer.init();
}

@NgModule({
    declarations: [
        LocaleListComponent,
        TranslatorPipe
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
        TranslatorPipe
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
                TranslatorService,
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
