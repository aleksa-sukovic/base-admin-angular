import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'per-page-selector',
    templateUrl: './per-page-selector.component.html',
    styleUrls: ['./per-page-selector.component.scss']
})
export class PerPageSelectorComponent implements OnInit
{
    @Input() selected: number;
    @Output() perPageChange = new EventEmitter();
    @Input() values: number[];

    constructor()
    {
        if (!this.values) {
            this.values = [5, 10, 20];
        }

        if (!this.selected) {
            this.selected = this.values[0];
        }
    }

    ngOnInit(): void
    {
    }

    protected onPerPageChange()
    {
        if (this.perPageChange) {
            this.perPageChange.emit(this.selected);
        }
    }
}
