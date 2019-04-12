import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'per-page-selector',
  templateUrl: './per-page-selector.component.html',
  styleUrls: ['./per-page-selector.component.scss']
})
export class PerPageSelectorComponent
{
    @Output() perPageChange = new EventEmitter();
    @Input() values: number[];

    protected selected: number;

    constructor()
    {
        if (!this.values) {
            this.values = [5, 10, 20];
        }

        this.selected = this.values[0];
    }

    protected onPerPageChange()
    {
        if (this.perPageChange) {
            this.perPageChange.emit(this.selected);
        }
    }
}
