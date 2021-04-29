import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayComponent } from './play.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [PlayComponent],
  exports: [
    PlayComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PlayModule { }
