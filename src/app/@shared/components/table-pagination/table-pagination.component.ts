import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePagination implements OnInit
{
    @Input() protected totalCount: number;
    @Input() protected perPage: number = 5;
    @Output() protected onPageSelect = new EventEmitter();

    protected numberOfPages: number;
    protected currentPage: number;

    constructor(private route: ActivatedRoute)
    {
        //
    }

    ngOnInit(): void
    {
        this.route.queryParamMap.subscribe(params => {
            let limit: any = params.has('limit') ? params.get('limit') : this.perPage;
            let offset: any = params.has('offset') ? params.get('offset') : 0;

            this.perPage = limit;
            this.numberOfPages = this.getNumberOfPages(parseInt(limit), parseInt(offset));
            this.currentPage = this.getCurrentPage(parseInt(limit), parseInt(offset));

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
        this.onPageSelect.emit({
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

    protected createRange(number: number, startIndex: number = 1): number[]
    {
        var items: number[] = [];

        for(var i = startIndex; i <= number; i++){
           items.push(i);
        }

        return items;
    }
}
