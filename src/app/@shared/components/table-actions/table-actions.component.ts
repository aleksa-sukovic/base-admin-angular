import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActions
{
    @Output() onDelete = new EventEmitter();
    @Output() onEdit = new EventEmitter();

    protected onClick(event: Event, action: string)
    {
        switch(action) {
            case 'edit':
                this.onEdit.emit();
                break;
            case 'delete':
                this.onDelete.emit();
                break;
        }

        event.stopPropagation();
    }
}
