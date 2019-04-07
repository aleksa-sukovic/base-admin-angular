import {Injectable, Injector, QueryList, ViewChildren} from '@angular/core';
import {SortableTableHeaderDirective, SortEvent} from '../../directives/tables/sortable.table.header.directive';
import {Resource} from 'src/app/@core/models/resource.model';
import {ResourceService} from 'src/app/@core/services/resource.service';
import {ResourceBaseComponent} from './resource-base.component';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';

@Injectable()
export abstract class ResourceList<Model extends Resource<Model>, ModelService extends ResourceService<Model>>
    extends ResourceBaseComponent<Model, ModelService>
{
    @ViewChildren(SortableTableHeaderDirective)
    protected headers: QueryList<SortableTableHeaderDirective>;

    protected data: Model[];
    protected totalCount: number;
    protected perPage: number;

    protected apiIncludes = 'translation,translations';
    protected apiAdditionalFields = 'count';

    protected constructor(injector: Injector)
    {
        super(injector);

        this.totalCount = 0;
        this.perPage = 5;
    }

    protected getData(params: any)
    {
        this.service.all(params).subscribe(data => {
            this.data = data.getCollection();

            this.totalCount = parseInt(data.getRaw().count, 10);
        });
    }

    protected onQueryParamsUpdate(params: any): void
    {
        setTimeout(() => {
            this.setTableSortHeaders(params);

            this.routerState.addQueryParams(params);
        });
    }

    protected onRouterRefresh(): void
    {
        setTimeout(() => {
            this.setTableSortHeaders(this.routerState.queryParams);

            this.getData(this.getParams(this.routerState.queryParams));
        });
    }

    public viewResource(resource: Model): void
    {
        this.showToast('Navigate', 'Navigate to resource \'' + resource.id + '\'', NbToastStatus.INFO);
    }

    public deleteResource(resource: Model): void
    {
        this.service.deleteById(resource.id).subscribe(() => {
            this.data = [];

            this.routerState.resetQueryParams();
            this.routerState.navigate([this.url]);

            this.showToast('Success', 'Item deleted successfully !');
        });
    }

    protected getParams(data: any): any
    {
        const params: any = {};
        Object.assign(params, data);

        params.include = this.apiIncludes;
        params.additional_fields = this.apiAdditionalFields;

        return params;
    }

    protected onPageSelect(event: any): void
    {
        this.routerState.addQueryParams({ offset: event.offset, limit: event.limit });

        this.routerState.navigate([ this.url ]);
    }

    protected onSort({ attribute, direction }: SortEvent)
    {
        this.clearTableSortHeaders(attribute);

        if (direction && direction.length) {
            this.routerState.addQueryParams({ orderby: attribute, order: direction });
        } else {
            this.routerState.addQueryParams({ orderby: '', order: '' });
        }

        this.routerState.navigate([ this.url ]);
    }

    protected onPerPageChange()
    {
        this.routerState.queryParams.limit = this.perPage;

        this.routerState.navigate([ this.url ]);
    }

    protected setTableSortHeaders(params: any): void
    {
        if (!params.orderby || !params.order) {
            return;
        }

        this.headers.forEach(header => {
            if (header.sortable === params.orderby) {
                header.setDirection(params.order);
            }
        });
    }

    protected clearTableSortHeaders(attribute: string): void
    {
        this.headers.forEach(header => {
            if (header.sortable !== attribute) {
                header.setDirection('');
            }
        });
    }
}
