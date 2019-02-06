import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router'
import { AkhilComponent } from './akhil/akhil.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {path : '', component : AkhilComponent},
  { path: 'akhil', component: AkhilComponent },
];
@NgModule({
  exports : [
    RouterModule, 
  ],
  imports: [
    CommonModule, 
    RouterModule.forRoot(routes)
  ],
  declarations: [],

})
export class AppRoutingModule { }
