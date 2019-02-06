import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TooltipModule} from 'ngx-bootstrap'
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import { AppComponent } from './app.component';
import { AkhilComponent } from './akhil/akhil.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule, MatSelectModule} from '@angular/material';
import {SelectModule} from 'ng2-select';



@NgModule({
  declarations: [
    AppComponent,
    AkhilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule, 
    MatNativeDateModule,
    MatSelectModule,
    SelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
