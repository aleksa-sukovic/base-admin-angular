import { Component, Injector } from '@angular/core';
import { ResourceList } from 'src/app/@shared/components/resource-list/resource.list.component';
import { Locale } from '../../models/locale.model';
import { LocaleService } from '../../services/locale.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'locale-list',
    templateUrl: './locale.list.component.html',
    styleUrls: ['./locale.list.component.scss']
})
export class LocaleList extends ResourceList<Locale, LocaleService>
{
    constructor(activatedRouter: ActivatedRoute, service: LocaleService)
    {
        super(activatedRouter, service);
    }
}
