import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { NgOtpInputModule } from '../core/ng-otp-input/ng-otp-input.module';
import { CoreAuthService } from 'ntk-cms-api';
import { CmsCaptchaComponent } from './cms-captcha/cms-captcha.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgOtpInputModule,

  ],

  declarations: [
    // common and shared components/directives/pipes between more than one module and components will be listed here.
  CmsCaptchaComponent,
  ],
  exports: [
    // common and shared components/directives/pipes between more than one module and components will be listed here.
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    CmsCaptchaComponent,
  ],

  providers:[
    CoreAuthService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    // Forcing the whole app to use the returned providers from the AppModule only.
    return {
      ngModule: SharedModule,
      providers: [
        /* All of your services here. It will hold the services needed by `itself`. */
      ],
    };
  }
}
