import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit
{
    @Input() protected totalCount: number;
    @Input() protected perPage = 5;
    @Output() protected pageSelect = new EventEmitter();

    protected numberOfPages: number;
    protected currentPage: number;

    constructor(private route: ActivatedRoute)
    {
        //
    }

    ngOnInit(): void
    {
        this.route.queryParamMap.subscribe(params => {
            const limit: any = params.has('limit') ? params.get('limit') : this.perPage;
            const offset: any = params.has('offset') ? params.get('offset') : 0;

            this.perPage = limit;
            this.numberOfPages = this.getNumberOfPages(parseInt(limit, 10), parseInt(offset, 10));
            this.currentPage = this.getCurrentPage(parseInt(limit, 10), parseInt(offset, 10));

            this.navigateToPage(this.currentPage);
        });
    }

    protected getNumberOfPages(limit: number, offset: number): number
    {
        return Math.ceil(this.totalCount / limit);
    }

    protected getCurrentPage(limit: number, offset: number): number
    {
        return Math.floor(offset / limit) + 1;
    }

    protected nextPage(): void
    {
        this.navigateToPage(this.createInfiniteRange(this.currentPage)[2] + 1);
    }

    protected previousPage(): void
    {
        this.navigateToPage(this.createInfiniteRange(this.currentPage)[0] - 1);
    }

    protected navigateToPage(page: number)
    {
        this.pageSelect.emit({
            limit: this.perPage,
            offset: this.perPage * (page - 1)
        });
    }

    protected createInfiniteRange(page: number): number[]
    {
        if (this.numberOfPages <= 3) {
            return [1, 2, 3];
        }

        if (page - 1 > 0 && page + 1 <= this.numberOfPages) {
            return [page - 1, page, page + 1];
        } else if (page - 1 > 0) {
            return [page - 2, page - 1, page];
        } else {
            return [page, page + 1, page + 2];
        }
    }

    protected createRange(max: number, startIndex: number = 1): number[]
    {
        const items: number[] = [];

        for (let i = startIndex; i <= max; i++) {
           items.push(i);
        }

        return items;
    }
}
