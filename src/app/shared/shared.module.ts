import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';


@NgModule({ declarations: [
    // common and shared components/directives/pipes between more than one module and components will be listed here.
    ],
    exports: [
        // common and shared components/directives/pipes between more than one module and components will be listed here.
        CommonModule,
        FormsModule,
        MaterialModule,
    ], imports: [CommonModule,
        FormsModule,
        MaterialModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
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
