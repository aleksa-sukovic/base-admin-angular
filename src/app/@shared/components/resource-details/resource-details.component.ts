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
        this.form = this.initializeForm();
        this.fillable = this.getFillable();
        this.resource = this.route.snapshot.data.locale;
    }

    abstract initializeForm(): FormGroup;
    abstract getFillable(): Attribute[];
    abstract getTranslationFillable(): Attribute[];
}
