import { Directive, Input, EventEmitter, Output } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent
{
    attribute: string;
    direction: SortDirection;
}

@Directive({
    selector: 'th[sortable]',
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()'
    }
})
export class SortableTableHeader
{
    @Input() sortable: string;
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();

    private rotateDirections: {[key: string]: SortDirection} = {
        'asc' : 'desc',
        'desc': '',
        ''    : 'asc'
    };

    rotate()
    {
        this.direction = this.rotateDirections[this.direction];

        this.sort.emit({ attribute: this.sortable, direction: this.direction });
    }
}
