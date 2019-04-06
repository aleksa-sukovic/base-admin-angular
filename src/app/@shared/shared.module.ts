import { NgModule } from '@angular/core';
import { PageNotFound } from './components/page-not-found/page-not-found.component';
import { ThemeModule } from '../@theme/theme.module';
import { RouterModule } from '@angular/router';
import { SortableTableHeader } from './directives/tables/sortable.table.header.directive';
import { TableActions } from './components/table-actions/table-actions.component';
import { TablePagination } from './components/table-pagination/table-pagination.component';

@NgModule({
    declarations: [
        PageNotFound,
        SortableTableHeader,
        TableActions,
        TablePagination
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
        SortableTableHeader,
        TableActions,
        TablePagination
    ]
})
export class SharedModule
{
    //
}
