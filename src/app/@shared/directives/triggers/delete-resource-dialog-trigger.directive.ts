import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DeleteResourceDialogComponent } from '../../components/delete-resource-dialog/delete-resource-dialog.component';

@Directive({
    selector: '[deleteResource]'
})
export class DeleteResourceDialogTriggerDirective
{
    @Input() resource: any;
    @Input() title: string;
    @Output() delete = new EventEmitter();

    @HostListener('click') public onClick()
    {
        this.openDialog();
    }

    constructor(private dialogService: NbDialogService)
    {
        //
    }

    protected openDialog()
    {
        this.dialogService.open(DeleteResourceDialogComponent, {
            context: {
                resource: this.resource,
                title: this.title
            }
        }).onClose.subscribe(data => {
            if (data && data.delete) {
                this.delete.emit();
            }
        });
    }
}
