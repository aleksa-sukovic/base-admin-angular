import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocaleList } from './components/list/locale.list.component';

const routes: Routes = [
    { path: 'locales', component: LocaleList }
];

export const LocaleRoute: ModuleWithProviders = RouterModule.forChild(routes);
