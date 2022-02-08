import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModificationsComponent } from './user-modifications.component';

const routes: Routes = [
  {
    path: '',
    component: UserModificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModificationsRoutingModule { }
