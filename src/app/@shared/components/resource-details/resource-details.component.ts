import { FormBuilder, FormGroup } from '@angular/forms';
import { Resource } from 'src/app/@core/models/resource.model';
import { Injectable, OnInit, Injector } from '@angular/core';
import { Attribute } from './attribute.interface';
import { ActivatedRoute } from '@angular/router';
import { LocaleService } from 'src/app/@modules/locale/services/locale.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbToastrService } from '@nebular/theme';
import { ResourceService } from 'src/app/@core/services/resource.service';
import { RouterStateService } from 'src/app/@core/services/router.state.service';
import { Subscription } from 'rxjs';
import { TranslatorService } from 'src/app/@core/services/translator.service';

@Injectable()
export abstract class ResourceDetailsComponent<Model extends Resource<Model>, ModelService extends ResourceService<Model>> implements OnInit
{
    protected form: FormGroup;
    protected formBuilder: FormBuilder;

    protected route: ActivatedRoute;
    protected routeSubscription: Subscription;

    protected localeService: LocaleService;
    protected toastService: NbToastrService;
    protected routerState: RouterStateService;

    protected resource: Model;
    protected resourceService: ModelService;
    protected errors: any;

    protected fillable: Attribute[];

    protected semaphores: any;
    protected baseUrl: string;

    constructor(injector: Injector)
    {
        this.formBuilder = injector.get(FormBuilder);
        this.route = injector.get(ActivatedRoute);
        this.routerState = injector.get(RouterStateService);
        this.localeService = injector.get(LocaleService);
        this.toastService = injector.get(NbToastrService);

        this.fillable = this.getFillable();
        this.resource = this.route.snapshot.data.item;

        this.semaphores = {
            formSubmitted: false,
            loading: false,
            hasErrors: false
        };
    }

    protected abstract getFillable(): Attribute[];

    public ngOnInit(): void
    {
        this.routeSubscription = this.route.data.subscribe(data => {
            this.resource = this.initResource(data.item);

            this.form = this.formBuilder.group(this.getFormBuilderParams());
        });
    }

    protected initResource(model: Model): Model
    {
        return model;
    }

    protected getFormBuilderParams(): any
    {
        let params = {};

        for (let attribute of this.fillable) {
            let paramValue = this.getValue(attribute);

            if (attribute.init) {
                paramValue = attribute.init(paramValue);
            }

            params[attribute.name] = [
                paramValue,
                attribute.validator
            ];
        }

        return params;
    }

    protected submit(): void
    {
        this.applyValues();
        this.semaphores.formSubmitted = true;

        if (this.form.invalid) {
            this.showToast(TranslatorService.get('validation.title'), TranslatorService.get('validation.fill-all-fields'), NbToastStatus.DANGER);

            return;
        }

        this.beforeSave();
        this.save();
    }

    protected beforeSave(): void
    {
        //
    }

    protected save(): any
    {
        this.semaphores.loading = true;

        this.resourceService.save(this.resource).subscribe(saved => {
            this.afterSave(saved.getItem());

            this.semaphores.loading = false;
            this.semaphores.formSubmitted = false;
            this.semaphores.hasErrors = false;

            if (!this.resource.id) {
                this.routerState.navigate([this.baseUrl, saved.getItem().id]);
            } else {
                this.routerState.refresh();
            }
        }, error => this.onSaveError(error));
    }

    protected afterSave(saved: Model): void
    {
        //
    }

    protected onSaveError(error: any): void
    {
        this.semaphores.hasErrors = true;
        this.semaphores.loading = false;
        this.semaphores.formSubmitted = false;
        this.errors = error.error.errors;
        this.showToast(TranslatorService.get('validation.title'), TranslatorService.get('validation.fix-errors'), NbToastStatus.DANGER);
    }

    protected deleteResource(): void
    {
        this.semaphores.loading = true;

        this.resourceService.delete(this.resource).subscribe(() => {
            this.semaphores.loading = false;

            this.routerState.navigate([this.baseUrl]);
        });
    }

    protected applyValues(): void
    {
        for (let attribute of this.fillable) {
            let control = this.form.get(attribute.name);

            if (attribute.apply) {
                let transformed = attribute.apply(control);

                if (transformed) {
                    this.saveValue(attribute, transformed);
                }

                continue;
            }

            this.saveValue(attribute, control.value);
        }
    }

    protected saveValue(attribute: Attribute, value: any): void
    {
        this.resource[attribute.name] = value;
    }

    protected getValue(attribute: Attribute): any
    {
        return this.getPropertyValue(attribute) || '';
    }

    protected getPropertyValue(attribute: Attribute): any
    {
        return this.resource[attribute.name] || null;
    }

    protected showToast(title: string, message: string, status: NbToastStatus = NbToastStatus.SUCCESS): void
    {
        this.toastService.show(
            message,
            title,
            { status }
        );
    }
}
