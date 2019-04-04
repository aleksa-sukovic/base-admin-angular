import { NgModule } from '@angular/core';
import { PageNotFound } from './components/page-not-found/page-not-found.component';
import { ThemeModule } from '../@theme/theme.module';
import { RouterModule } from '@angular/router';
import { SortableTableHeader } from './directives/tables/sortable.table.header.directive';

@NgModule({
    declarations: [
        PageNotFound,
        SortableTableHeader
    ],
    imports: [
        ThemeModule,
        RouterModule
    ],
    providers: [
        //
    ],
    exports: [
        PageNotFound,
        SortableTableHeader
    ]
})
export class SharedModule
{
    //
}
