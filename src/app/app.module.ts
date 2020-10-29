import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LinkManagementShortLinkComponent } from './pages/linkManagement/link-management-short-link/link-management-short-link.component';
import { FileUploadComponent } from './pages/fileManager/file-upload/file-upload.component';
import { CoreAuthService, LinkManagementTargetService } from 'ntk-cms-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlowInjectionToken, NgxFlowModule } from '@flowjs/ngx-flow';
import Flow from '@flowjs/flow.js';
import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreAboutUsComponent } from './pages/core/core-about-us/core-about-us.component';
import { CoreContactUsComponent } from './pages/core/core-contact-us/core-contact-us.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    LinkManagementShortLinkComponent,
    FileUploadComponent,
    CoreAboutUsComponent,
    CoreContactUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    NgxFlowModule,
     HttpClientModule,
    // FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [
    LinkManagementTargetService,
    CoreAuthService,
    {
      provide: FlowInjectionToken,
      useValue: Flow,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
