import { ViewChildren, QueryList } from '@angular/core';
import { SortableTableHeader, SortEvent } from '../../directives/tables/sortable.table.header.directive';

export class ResourceList
{
    @ViewChildren(SortableTableHeader) headers: QueryList<SortableTableHeader>;

    onSort({ column, direction }: SortEvent)
    {
        this.clearHeaders(column);

        console.log(column, direction);
    }

    protected clearHeaders(column: string): void
    {
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
    }
}
