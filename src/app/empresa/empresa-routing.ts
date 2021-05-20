import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../core/auth/auth-guard.service';
import {EmpresaComponent} from './empresa.component';

const routes: Routes = [
  {
    path: '',
    component: EmpresaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule {

  constructor() {
  }
}
