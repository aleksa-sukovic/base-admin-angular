import { Component } from '@angular/core';
import { LocaleService } from './@core/services/locale.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    constructor(private localeService: LocaleService)
    {
       console.log(localeService.available);
       console.log(localeService.current);
    }
}
