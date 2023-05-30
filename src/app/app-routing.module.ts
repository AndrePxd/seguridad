import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Kri2Component} from "./components/kri2/kri2.component";
import {KriComponent} from "./components/kri/kri.component";


const routes: Routes = [
  {path: 'retraso', component: Kri2Component},
  {path: 'incumplimiento', component: KriComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
