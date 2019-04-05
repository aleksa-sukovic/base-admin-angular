import { ViewChildren, QueryList, OnInit, Injectable } from '@angular/core';
import { SortableTableHeader, SortEvent } from '../../directives/tables/sortable.table.header.directive';
import { Resource } from 'src/app/@core/models/resource.model';
import { ResourceService } from 'src/app/@core/services/resource.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export abstract class ResourceList<Model extends Resource<Model>, ModelService extends ResourceService<Model>> implements OnInit
{
    @ViewChildren(SortableTableHeader)
    protected headers: QueryList<SortableTableHeader>;

    protected data: Model[];

    constructor(protected route: ActivatedRoute, protected service: ModelService)
    {
        //
    }

    protected getData(params: any)
    {
        this.service.all(params).subscribe(data => {
            this.data = data;

            console.log(this.data);
        });
    }

    ngOnInit(): void
    {
        this.route.queryParamMap.subscribe((params: any)  => {
            this.getData(params.params);
        })
    }

    protected onSort({ column, direction }: SortEvent)
    {
        this.clearHeaders(column);

        console.log(column, direction);
    }

    protected clearHeaders(column: string): void
    {
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
    }
}
