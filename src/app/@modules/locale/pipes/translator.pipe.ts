import { PipeTransform, Pipe } from '@angular/core';
import { TranslatorService } from '../services/translator.service';

@Pipe({
    name: 'translate',
    pure: false
})
export class TranslatorPipe implements PipeTransform
{
    constructor(private translator: TranslatorService)
    {
        //
    }

    public transform(key: any, ...args: any[])
    {
        return this.translator.get(key);
    }
}
