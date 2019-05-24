import { NgModule } from '@angular/core';
import { RequiredExampleRoute } from './required-example.routing';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { LocaleModule } from '../locale/locale.module';
import { CoreModule } from 'src/app/@core/core.module';
import { RequiredExampleComponent } from './components/required-example/required-example.component';

@NgModule({
    declarations: [
        RequiredExampleComponent
    ],
    imports: [
        RequiredExampleRoute,
        ThemeModule,
        LocaleModule,
        CoreModule
    ],
    providers: []
})
export class RequiredExample { }
