import { NgModule } from '@angular/core';
import { DashboardRoute } from './dashboard.routing';
import { Dashboard } from './components/dashboard/dashboard.component';

@NgModule({
    declarations: [
        Dashboard
    ],
    imports: [
        DashboardRoute
    ],
    providers: []
})
export class DashboardModule { }
