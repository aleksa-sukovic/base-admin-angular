import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LocaleService } from '../@modules/locale/services/locale.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ApiService } from './services/api.service';
import { LocaleInitializer } from '../@modules/locale/initializers/locale-initializer.service';
import { SidebarMenuService } from './services/sidebar.menu.service';
import { ThemeModule } from '../@theme/theme.module';
import { NbLayoutModule } from '@nebular/theme';
import { RouterStateService } from './services/router.state.service';
import {LocaleInterceptor} from './interceptors/locale.interceptor';

@NgModule({
    declarations: [
        //
    ],
    imports: [
        HttpClientModule,
        ThemeModule,
        NbLayoutModule
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
                SidebarMenuService,
                RouterStateService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: LocaleInterceptor,
                    multi: true
                }
            ]
        };
    }
}
