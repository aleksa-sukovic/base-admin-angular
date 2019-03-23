import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LocaleService } from './services/locale.service';

@NgModule({
    imports: [],
    providers: [],
    exports: []
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
                LocaleService
            ]
        }
    }
}
