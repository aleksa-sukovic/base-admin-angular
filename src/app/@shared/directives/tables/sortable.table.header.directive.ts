import {Directive, Input, EventEmitter, Output, HostListener, HostBinding} from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent
{
    attribute: string;
    direction: SortDirection;
}

@Directive({
    selector: 'th[sortable]'
})
export class SortableTableHeaderDirective
{
    @Input() sortable: string;
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();

    private rotateDirections: {[key: string]: SortDirection} = {
        asc : 'desc',
        desc: '',
        ''    : 'asc'
    };

    @HostBinding('class.asc') protected isAscending = this.direction === 'asc';
    @HostBinding('class.desc') protected isDescending = this.direction === 'desc';
    @HostListener('click') protected onClick()
    {
        this.rotate();
    }

    rotate()
    {
        this.direction = this.rotateDirections[this.direction];

        this.setIcons(this.direction);

        this.sort.emit({ attribute: this.sortable, direction: this.direction });
    }

    public setDirection(direction: SortDirection): void
    {
        this.direction = direction;

        this.setIcons(direction);
    }

    protected setIcons(direction: SortDirection): void
    {
        this.isAscending = direction === 'asc';
        this.isDescending = direction === 'desc';
    }
}
