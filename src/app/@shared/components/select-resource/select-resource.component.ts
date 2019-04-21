import { Resource } from 'src/app/@core/models/resource.model';
import { ResourceService } from 'src/app/@core/services/resource.service';
import { Input, OnInit } from '@angular/core';

export abstract class SelectResourceComponent<Model extends Resource<Model>, ModelService extends ResourceService<Model>>
    implements OnInit
{
    @Input() protected apiParams: any;
    @Input() selectedId: number;

    protected data: Model[];
    protected service: ModelService;
    protected selected: Model;

    constructor()
    {
        if (!this.apiParams) {
            this.apiParams = {};
        }
    }

    ngOnInit(): void
    {
        this.service.all(this.apiParams).subscribe(data => {
            this.data = data.getCollection();

            if (this.selectedId) {
                this.selected = this.data.find(item => item.id == this.selectedId);
                this.onResourceSelected();
            }
        });
    }

    protected abstract onResourceSelected(): void;
}
