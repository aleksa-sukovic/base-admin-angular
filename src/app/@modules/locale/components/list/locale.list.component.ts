import { Component, Injector } from '@angular/core';
import { ResourceList } from 'src/app/@shared/components/resource-list/resource-list.component';
import { Locale } from '../../models/locale.model';
import { LocaleService } from '../../services/locale.service';

@Component({
    selector: 'locale-list',
    templateUrl: './locale.list.component.html',
    styleUrls: ['./locale.list.component.scss']
})
export class LocaleListComponent extends ResourceList<Locale, LocaleService>
{
    protected baseUrl = 'locales';

    constructor(injector: Injector)
    {
        super(injector);

        this.service = injector.get(LocaleService);
    }
}
