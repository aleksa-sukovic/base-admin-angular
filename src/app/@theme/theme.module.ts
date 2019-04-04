import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbCardModule, NbMenuModule } from '@nebular/theme';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const NB_MODULES = [
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbMenuModule,
    NgbModule
];

const NB_THEME_PROVIDERS = [
    ...NbThemeModule.forRoot({ name: 'corporate' }).providers,
    ...NbSidebarModule.forRoot().providers,
    ...NbMenuModule.forRoot().providers
];

@NgModule({
    imports: [...BASE_MODULES, ...NB_MODULES],
    exports: [...BASE_MODULES, ...NB_MODULES],
    declarations: []
})
export class ThemeModule
{
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders> {
            ngModule: ThemeModule,
            providers: [...NB_THEME_PROVIDERS],
        };
    }
}
