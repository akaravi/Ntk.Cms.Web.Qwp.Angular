import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreAboutUsComponent } from './core-about-us/core-about-us.component';
import { CoreContactUsComponent } from './core-contact-us/core-contact-us.component';



@NgModule({
  declarations: [CoreAboutUsComponent, CoreContactUsComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
