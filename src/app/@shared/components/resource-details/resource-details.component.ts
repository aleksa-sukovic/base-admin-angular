import { FormBuilder, FormGroup } from '@angular/forms';
import { Resource } from 'src/app/@core/models/resource.model';
import { Injectable } from '@angular/core';
import { Attribute } from './attribute.interface';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export abstract class ResourceDetailsComponent<Model extends Resource<Model>>
{
    protected form: FormGroup;
    protected resource: Model;
    protected fillable: Attribute[];

    constructor(protected formBuilder: FormBuilder, protected route: ActivatedRoute)
    {
        this.fillable = this.getFillable();
        this.resource = this.route.snapshot.data.item;

        this.form = this.initializeForm();
    }

    abstract getFillable(): Attribute[];

    protected submit(): void
    {
        for (let attribute of this.fillable) {
            let control = this.form.get(attribute.name);

            attribute.apply(attribute, control.value, control);
        }

        console.log('Submit resource', this.resource);
    }

    initializeForm(): FormGroup
    {
        let data = {};

        for (let attribute of this.fillable) {
            data[attribute.name] = ['', attribute.validator]
        }

        return this.formBuilder.group(data);
    }
}
