import { NgModule } from '@angular/core';
import { PageNotFound } from './components/page-not-found/page-not-found.component';
import { ThemeModule } from '../@theme/theme.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        PageNotFound
    ],
    imports: [
        ThemeModule,
        RouterModule
    ],
    providers: [
        //
    ],
    exports: [
        PageNotFound
    ]
})
export class SharedModule
{
    //
}
