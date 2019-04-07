import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'delete-resource-dialog',
  templateUrl: './delete-resource-dialog.component.html',
  styleUrls: ['./delete-resource-dialog.component.scss']
})
export class DeleteResourceDialog
{
    @Input() protected title: string = '';

    constructor(protected dialogRef: NbDialogRef<DeleteResourceDialog>)
    {
        //
    }

    protected closeDialog(data?: any)
    {
        this.dialogRef.close(data);
    }
}
