import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedModule } from 'src/app/@shared/shared.module';
import { UserGroupService } from './services/user-group.service';
import { UserGroupRoute } from './user-group.routing';
import { UserGroupListComponent } from './components/list/user-group-list.component';
import { SelectUserGroupComponent } from './components/select-user-group/select-user-group.component';
import { CoreModule } from 'src/app/@core/core.module';

@NgModule({
    declarations: [
        UserGroupListComponent,
        SelectUserGroupComponent
    ],
    imports: [
        RouterModule,
        UserGroupRoute,
        ThemeModule,
        SharedModule,
        RouterModule,
        CoreModule
    ],
    providers: [
        UserGroupService,
    ],
    exports: [
        SelectUserGroupComponent
    ]
})
export class UserGroupModule
{
    //
}
