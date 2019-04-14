import { NgModule } from '@angular/core';
import { DashboardRoute } from './dashboard.routing';
import { Dashboard } from './components/dashboard/dashboard.component';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule({
    declarations: [
        Dashboard
    ],
    imports: [
        DashboardRoute,
        ThemeModule
    ],
    providers: []
})
export class DashboardModule { }
