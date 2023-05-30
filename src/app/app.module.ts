import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { KriComponent } from './components/kri/kri.component';
import { NgChartsModule } from 'ng2-charts';
import {ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Kri2Component } from './components/kri2/kri2.component';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    KriComponent,
    NavbarComponent,
    Kri2Component,

  ],
    imports: [
        BrowserModule,
        RouterOutlet,
        NgChartsModule,
        ReactiveFormsModule,
        NgbModule,
        RouterLink,
      AppRoutingModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
