import { Injectable, Injector } from "@angular/core";
import { Locale } from '../models/locale.model';
import { LocaleService } from '../services/locale.service';
import { ResourceResolver } from 'src/app/@shared/resolvers/resource.resolver';

@Injectable()
export class LocaleResolver extends ResourceResolver<Locale, LocaleService>
{
    protected apiIncludes = 'translation,translations';

    constructor(injector: Injector)
    {
        super(injector);

        this.resourceService = injector.get(LocaleService);
    }

    makeDefaultInstance(): Locale
    {
        return new Locale({});
    }
}
