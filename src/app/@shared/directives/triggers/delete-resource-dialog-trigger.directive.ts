import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DeleteResourceDialog } from '../../components/delete-resource-dialog/delete-resource-dialog.component';
2
@Directive({
    selector: '[delete-resource]'
})
export class DeleteResourceDialogTrigger
{
    @Input() resource: any;
    @Input() title: string;
    @Output() onDelete = new EventEmitter();

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
        this.dialogService.open(DeleteResourceDialog, {
            context: {
                resource: this.resource,
                title: this.title
            }
        }).onClose.subscribe(data => {
            if (data && data.delete) {
                this.onDelete.emit();
            }
        });
    }
}
