import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { TranslatorService } from 'src/app/@core/services/translator.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'required-example',
    templateUrl: './required-example.component.html',
    styleUrls: ['./required-example.component.scss']
})
export class RequiredExampleComponent
{
    protected formBuilder: FormBuilder;
    protected form: FormGroup;

    protected toastService: NbToastrService;
    protected translator: TranslatorService;
    protected http: HttpClient;

    protected semaphore: any;
    protected data: any;

    constructor(injector: Injector)
    {
        this.formBuilder = injector.get(FormBuilder);
        this.form = injector.get(FormBuilder).group({
            address: ['', Validators.required],
            index  : ['', Validators.required]
        });

        this.toastService = injector.get(NbToastrService);
        this.translator = injector.get(TranslatorService);
        this.http = injector.get(HttpClient);

        this.semaphore = {
            formSubmitted: false,
            hasData: false,
            loading: false
        };
    }

    protected onSubmit()
    {
        this.semaphore.formSubmitted = true;
        this.semaphore.loading = true;

        if (!this.form.valid) {
            this.showToast(this.translator.get('validation.title'), this.translator.get('validation.fix-errors'), NbToastStatus.DANGER);

            this.semaphore.loading = false;

            return;
        }

        let address = this.form.get('address').value;
        let index = this.form.get('index').value;

        this.post(address, index);
    }

    protected post(address: string, data: string): void
    {
        this.http.post('http://' + address, { "br_ind": data }, {
            observe: 'response',
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).subscribe(response => {
            console.log(response);

            this.semaphore.loading       = false;
            this.semaphore.formSubmitted = false;
        });
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
