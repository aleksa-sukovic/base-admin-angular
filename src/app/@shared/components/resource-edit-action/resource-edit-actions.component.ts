import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'resource-edit-actions',
  templateUrl: './resource-edit-actions.component.html',
  styleUrls: ['./resource-edit-actions.component.scss']
})
export class ResourceEditActions
{
    @Output() save = new EventEmitter();
    @Output() delete = new EventEmitter();
    @Output() translationDelete = new EventEmitter();

    @Input() resource: any;
    @Input() deleteTitle: any;
    @Input() translationDeleteTitle: any;
    @Input() showTranslationAction: boolean;
    @Input() loading: boolean;

    constructor()
    {
        //
    }
}
