import { Component, Output, EventEmitter } from '@angular/core';
import { SelectResourceComponent } from 'src/app/@shared/components/select-resource/select-resource.component';
import { UserGroup } from '../../models/user-group.model';
import { UserGroupService } from '../../services/user-group.service';

@Component({
    selector: 'select-user-group',
    templateUrl: './select-user-group.component.html',
    styleUrls: ['./select-user-group.component.scss']
})
export class SelectUserGroupComponent extends SelectResourceComponent<UserGroup, UserGroupService>
{
    @Output() onSelect = new EventEmitter;

    constructor(service: UserGroupService)
    {
        super();

        this.service = service;
    }

    protected onResourceSelected(): void
    {
        this.onSelect.emit(this.selected);
    }
}
