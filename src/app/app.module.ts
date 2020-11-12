import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LinkManagementShortLinkComponent } from './pages/linkManagement/link-management-short-link/link-management-short-link.component';
import { FileUploadComponent } from './pages/fileManager/file-upload/file-upload.component';
import {
  CoreAuthService, EnumDeviceType, EnumOperatingSystemType, LinkManagementTargetService,
  NewsContentService, TicketingTaskService, TokenDeviceClientInfoDtoModel
} from 'ntk-cms-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlowInjectionToken, NgxFlowModule } from '@flowjs/ngx-flow';
import Flow from '@flowjs/flow.js';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreAboutUsComponent } from './pages/core/core-about-us/core-about-us.component';
import { CoreContactUsComponent } from './pages/core/core-contact-us/core-contact-us.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewsContentListComponent } from './pages/news/news-content-list/news-content-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthInterceptor } from './core/interceptor/auth-interceptor.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TicketingDepartemenService } from 'ntk-cms-api';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    LinkManagementShortLinkComponent,
    FileUploadComponent,
    CoreAboutUsComponent,
    CoreContactUsComponent,
    NewsContentListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    ToastrModule.forRoot(),
    NgxFlowModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ToastrService,
    CoreAuthService,
    LinkManagementTargetService,
    NewsContentService,
    TicketingTaskService,
    TicketingDepartemenService,

    {
      provide: FlowInjectionToken,
      useValue: Flow,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      // deps: [CmsToastrService]

    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(private coreAuthService: CoreAuthService) {
    // karavi:Important For Test To Local Service
    if (environment.cmsServerConfig.configApiServerPath && environment.cmsServerConfig.configApiServerPath.length > 0) {
      this.coreAuthService.setConfig(environment.cmsServerConfig.configApiServerPath);
    }
    const DeviceToken = this.coreAuthService.getDeviceToken();
    if (!DeviceToken || DeviceToken.length === 0) {
      const model: TokenDeviceClientInfoDtoModel = {
        SecurityKey: environment.cmsTokenConfig.SecurityKey,
        ClientMACAddress: '',
        OSType: EnumOperatingSystemType.none,
        DeviceType: EnumDeviceType.WebSite,
        PackageName: '',
      };


      this.coreAuthService.ServiceGetTokenDevice(model).toPromise();
    }
  }

}
