import { ResourceDetailsComponent } from './resource-details.component';
import { TranslatableResource } from 'src/app/@core/models/translatable.resource.model';
import { Injector, Injectable, OnDestroy } from '@angular/core';
import { Attribute } from './attribute.interface';
import { Subscription } from 'rxjs';
import { TranslatedResourceService } from 'src/app/@core/services/translated-resource.service';
import { Resource } from 'src/app/@core/models/resource.model';

@Injectable()
export abstract class TranslatedResourceDetailsComponent
    < Model extends TranslatableResource<Model, ModelTranslation>, ModelTranslation extends Resource<ModelTranslation>, ModelService extends TranslatedResourceService<Model, ModelTranslation> >
extends ResourceDetailsComponent<Model, ModelService> implements OnDestroy
{
    protected translationFillable: Attribute[];
    protected localeSubscription: Subscription;

    constructor(injector: Injector)
    {
        super(injector);

        this.translationFillable = this.getTranslationFillable();
        this.fillable = this.fillable.concat(this.translationFillable);
    }

    protected abstract getTranslationFillable(): Attribute[];

    public ngOnInit(): void
    {
        super.ngOnInit();

        this.localeSubscription = this.localeService.currentStream.subscribe(() => this.routerState.refresh());
    }

    public ngOnDestroy(): void
    {
        if (this.localeSubscription) {
            this.localeSubscription.unsubscribe();
        }
    }

    protected deleteTranslation(): void
    {
        this.resourceService.deleteTranslation(this.resource).subscribe(() => {
            if (this.resource.translations.length == 1) {
                this.routerState.navigate([this.baseUrl], true);

                return;
            }

            this.routerState.refresh();
        });
    }

    protected saveValue(attribute: Attribute, value: any): void
    {
        if (this.translationFillable.find(item => item.name === attribute.name)) {
            this.resource.translation[attribute.name] = value;

            return;
        }

        this.resource[attribute.name] = value;
    }

    protected getValue(attribute: Attribute): any
    {
        return this.getPropertyValue(attribute) || this.getTranslationPropertyValue(attribute) || '';
    }

    protected getTranslationPropertyValue(attribute: Attribute): any
    {
        return this.resource['translation'] ? this.resource['translation'][attribute.name] || null : null;
    }
}
