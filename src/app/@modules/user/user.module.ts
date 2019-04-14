import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocaleRoute } from './user.routing';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedModule } from 'src/app/@shared/shared.module';
import { UserService } from './services/user.service';
import { UserListComponent } from './components/list/user-list.component';
import { UserDetailsComponent } from './components/details/user-details.component';
import { UserResolver } from './resolvers/user.resolver';

@NgModule({
    declarations: [
        UserListComponent,
        UserDetailsComponent
    ],
    imports: [
        RouterModule,
        LocaleRoute,
        ThemeModule,
        SharedModule,
        RouterModule
    ],
    providers: [
        UserService,
        UserResolver
    ],
    exports: [
        //
    ]
})
export class UserModule
{
    //
}
