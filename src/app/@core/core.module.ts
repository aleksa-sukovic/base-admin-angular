import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LocaleService } from '../@modules/locale/services/locale.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { Initializer } from './services/initializer.service';
import { SidebarMenuService } from './services/sidebar.menu.service';
import { Sidebar } from './components/sidebar.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbLayoutModule } from '@nebular/theme';

export function initialize(initializer: Initializer)
{
    return (): Promise<void> => initializer.init();
}

@NgModule({
    declarations: [
        Sidebar
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
        Sidebar
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
