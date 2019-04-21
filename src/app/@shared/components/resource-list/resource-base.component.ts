import {Injector, OnDestroy, OnInit} from '@angular/core';
import {NbToastrService} from '@nebular/theme';
import {Resource} from '../../../@core/models/resource.model';
import {ResourceService} from '../../../@core/services/resource.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterStateService} from '../../../@core/services/router.state.service';
import {Subscription} from 'rxjs';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {LocaleService} from 'src/app/@modules/locale/services/locale.service';
import { TranslatorService } from 'src/app/@core/services/translator.service';

export abstract class ResourceBaseComponent<Model extends Resource<Model>, ModelService extends ResourceService<Model>> implements OnDestroy, OnInit
{
    protected toastService: NbToastrService;
    protected route: ActivatedRoute;
    protected router: Router;
    protected localeService:LocaleService;
    protected routerState: RouterStateService;
    protected localeChange: Subscription;
    protected url: string;
    protected routeParamsSubscription: Subscription;
    protected translatorSubscription: Subscription;

    protected service: ModelService;

    protected constructor(injector: Injector)
    {
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.routerState = injector.get(RouterStateService);
        this.toastService = injector.get(NbToastrService);
        this.localeService = injector.get(LocaleService);
        this.url = this.router.url.split('?')[0];
    }

    public ngOnDestroy(): void
    {
        if (this.localeChange) {
            this.localeChange.unsubscribe();
        }

        this.routeParamsSubscription.unsubscribe();
        this.translatorSubscription.unsubscribe();
    }

    public ngOnInit(): void
    {
        this.routeParamsSubscription = this.route.queryParamMap.subscribe((params: any)  => {
            this.onQueryParamsUpdate(params.params);
        });


        this.translatorSubscription = TranslatorService.refresh.subscribe(() => this.onLocaleChange());
    }

    protected abstract onQueryParamsUpdate(params: any): void;
    protected abstract onLocaleChange(): void;

    protected showToast(title: string, message: string, status: NbToastStatus = NbToastStatus.SUCCESS): void
    {
        this.toastService.show(
            message,
            title,
            { status }
        );
    }
}
