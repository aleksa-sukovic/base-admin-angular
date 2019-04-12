import { Component, Input } from '@angular/core';

@Component({
  selector: 'resource-details-header',
  templateUrl: './resource-details-header.component.html',
  styleUrls: ['./resource-details-header.component.scss']
})
export class ResourceDetailsHeaderComponent
{
    @Input() title = 'Resource Details';

    constructor()
    {

    }
}
