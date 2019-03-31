import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LocaleService } from './services/locale.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { Initializer } from './services/initializer.service';

export function initialize(initializer: Initializer)
{
    return (): Promise<void> => initializer.init();
}

@NgModule({
    declarations: [
        //
    ],
    imports: [
        HttpClientModule
    ],
    providers: [
        //
    ],
    exports: [
        //
    ]
})
export class CoreModule
{
    constructor(@Optional() @SkipSelf() parentModule: CoreModule)
    {
        if (parentModule) {
            throw new Error('CoreModule is already loaded!');
        }
    }

    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: CoreModule,
            providers: [
                LocaleService,
                ApiService,
                {
                    provide: APP_INITIALIZER,
                    useFactory: initialize,
                    deps: [Initializer, LocaleService],
                    multi: true
                }
            ]
        }
    }
}
