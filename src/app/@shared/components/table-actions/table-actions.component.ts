import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent
{
    @Input() resource: any;
    @Input() title: any;
    @Output() onDelete = new EventEmitter();
    @Output() onEdit = new EventEmitter();

    protected onEditEvent(event: Event)
    {
        this.onEdit.emit();

        event.stopPropagation();
    }
}
