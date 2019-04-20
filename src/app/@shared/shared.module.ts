import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ThemeModule } from '../@theme/theme.module';
import { RouterModule } from '@angular/router';
import { SortableTableHeaderDirective } from './directives/tables/sortable.table.header.directive';
import { TableActionsComponent } from './components/table-actions/table-actions.component';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';
import { DeleteResourceDialogComponent } from './components/delete-resource-dialog/delete-resource-dialog.component';
import { DeleteResourceDialogTriggerDirective } from './directives/triggers/delete-resource-dialog-trigger.directive';
import { LanguagePickerComponent } from './components/language-picker/language-picker.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ResourceDetailsHeaderComponent } from './components/resource-details-header/resource-details-header.component';
import { PerPageSelectorComponent } from './components/per-page-selector/per-page-selector.component';
import { ResourceEditActions } from './components/resource-edit-action/resource-edit-actions.component';
import { LayoutHeaderComponent } from './components/layout-header/layout-header.component';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        SortableTableHeaderDirective,
        TableActionsComponent,
        TablePaginationComponent,
        DeleteResourceDialogComponent,
        DeleteResourceDialogTriggerDirective,
        LanguagePickerComponent,
        SidebarComponent,
        ResourceDetailsHeaderComponent,
        PerPageSelectorComponent,
        ResourceEditActions,
        LayoutHeaderComponent
    ],
    entryComponents: [
        DeleteResourceDialogComponent
    ],
    imports: [
        ThemeModule,
        RouterModule,
    ],
    providers: [
        //
    ],
    exports: [
        PageNotFoundComponent,
        SortableTableHeaderDirective,
        TableActionsComponent,
        TablePaginationComponent,
        DeleteResourceDialogComponent,
        DeleteResourceDialogTriggerDirective,
        LanguagePickerComponent,
        SidebarComponent,
        ResourceDetailsHeaderComponent,
        PerPageSelectorComponent,
        ResourceEditActions,
        LayoutHeaderComponent
    ]
})
export class SharedModule
{
    //
}
