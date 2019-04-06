import { ViewChildren, QueryList, OnInit, Injectable, Injector } from '@angular/core';
import { SortableTableHeader, SortEvent } from '../../directives/tables/sortable.table.header.directive';
import { Resource } from 'src/app/@core/models/resource.model';
import { ResourceService } from 'src/app/@core/services/resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterStateService } from 'src/app/@core/services/router.state.service';

@Injectable()
export abstract class ResourceList<Model extends Resource<Model>, ModelService extends ResourceService<Model>> implements OnInit
{
    @ViewChildren(SortableTableHeader)
    protected headers: QueryList<SortableTableHeader>;
    protected route: ActivatedRoute;
    protected router: Router;
    protected routerState: RouterStateService;
    protected service: ModelService;

    protected data: Model[];
    protected totalCount: number;
    protected perPage: number;
    protected url: string;

    constructor(injector: Injector)
    {
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.routerState = injector.get(RouterStateService);

        this.totalCount = 0;
        this.perPage = 5;
        this.url = this.router.url.split('?')[0];
    }

    protected getData(params: any)
    {
        this.service.all(params).subscribe(data => {
            this.data = data.getCollection();

            this.totalCount = parseInt(data.getRaw().count);
        });
    }

    public ngOnInit(): void
    {
        this.route.queryParamMap.subscribe((params: any)  => {
            setTimeout(() => {
                this.setHeaders(params.params);

                this.getData(this.getParams(params.params));
            });
        })
    }

    public viewResource(resource: Model): void
    {
        console.log('Navigate to resource: ' + resource.id);
    }

    public deleteResource(resource: Model): void
    {
        console.log('Delete resource: ' + resource.id);
    }

    protected getParams(data: any): any
    {
        let params: any = {};
        Object.assign(params, data);

        if (!params['include']) {
            params.include = 'translation,translations';
        }

        if (!params['additional_fields']) {
            params.additional_fields = 'count';
        }

        return params;
    }

    protected onPageSelect(event: any): void
    {
        this.routerState.queryParams.offset = event.offset;
        this.routerState.queryParams.limit = event.limit;

        this.routerState.navigate([ this.url ]);
    }

    protected onSort({ attribute, direction }: SortEvent)
    {
        this.clearHeaders(attribute);

        if (direction && direction.length) {
            this.routerState.queryParams.orderby = attribute;
            this.routerState.queryParams.order = direction;
            this.routerState.navigate([ this.url ]);

            return;
        }

        this.routerState.queryParams.orderby = '';
        this.routerState.queryParams.order = '';
        this.routerState.navigate([ this.url ]);
    }

    protected onPerPageChange()
    {
        this.routerState.queryParams.limit = this.perPage;

        this.routerState.navigate([this.url]);
    }

    protected setHeaders(params: any): void
    {
        if (!params.order_by || !params.order) {
            return;
        }

        this.headers.forEach(header => {
            if (header.sortable === params.order_by) {
                header.direction = params.order;
            }
        });
    }

    protected clearHeaders(attribute: string): void
    {
        this.headers.forEach(header => {
            if (header.sortable !== attribute) {
                header.direction = '';
            }
        });
    }
}
