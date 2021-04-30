import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing';
import { ChatComponent } from './chat/chat.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, ChatComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ScrollingModule,
        ReactiveFormsModule
    ]
})
export class HomeModule { }
