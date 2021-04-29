import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SigninComponent} from './signin.component';
import {RouterModule} from '@angular/router';
import {SigninRoutingModule} from './signin-routing';
import {ReactiveFormsModule} from '@angular/forms';
import {PlayModule} from '../play/play.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [SigninComponent],
  exports: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SigninRoutingModule,
    ReactiveFormsModule,
    PlayModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class SigninModule {
}
