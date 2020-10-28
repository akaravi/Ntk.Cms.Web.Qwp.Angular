import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopupComponent } from './pages/popup/popup.component';
import { PopupRoutingModule } from './popup-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxFlowModule, FlowInjectionToken } from '@flowjs/ngx-flow';
import Flow from '@flowjs/flow.js';
import { UploadFileComponent } from '../upload-file/upload-file.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [PopupComponent, UploadFileComponent],
  imports: [
    CommonModule,
    PopupRoutingModule,
    FormsModule,
    // BrowserAnimationsModule,
    NgxFlowModule,
  ],
  providers: [
    {
      provide: FlowInjectionToken,
      useValue: Flow,
    },
  ],
})
export class PopupModule {}
