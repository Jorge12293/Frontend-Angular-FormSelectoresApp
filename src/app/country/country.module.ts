import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryRoutingModule } from './country-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';


@NgModule({
  declarations: [
    SelectorPageComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    ReactiveFormsModule
  ]
})
export class CountryModule { }
