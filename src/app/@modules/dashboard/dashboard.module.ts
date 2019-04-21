import { NgModule } from '@angular/core';
import { DashboardRoute } from './dashboard.routing';
import { Dashboard } from './components/dashboard/dashboard.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { LocaleModule } from '../locale/locale.module';
import { CoreModule } from 'src/app/@core/core.module';

@NgModule({
    declarations: [
        Dashboard
    ],
    imports: [
        DashboardRoute,
        ThemeModule,
        LocaleModule,
        CoreModule
    ],
    providers: []
})
export class DashboardModule { }
