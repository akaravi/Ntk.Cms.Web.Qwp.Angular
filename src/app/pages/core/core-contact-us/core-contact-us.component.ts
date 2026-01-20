import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CaptchaModel, CoreAuthService, ErrorExceptionResult, FormInfoModel,
  TicketingDepartemenModel, TicketingDepartemenService, TicketingTaskDtoModel, TicketingTaskModel, TicketingTaskService
} from 'ntk-cms-api';

import { CmsToastrService } from 'src/app/core/base/cmsToastr.service';

@Component({
    selector: 'app-core-contact-us',
    templateUrl: './core-contact-us.component.html',
    styleUrls: ['./core-contact-us.component.css'],
    standalone: false
})
export class CoreContactUsComponent implements OnInit {

  constructor(private ticketingTaskService: TicketingTaskService,
    private coreAuthService: CoreAuthService,
    private ticketingDepartemenService: TicketingDepartemenService,
    private toasterService: CmsToastrService) { }
  dataModel: TicketingTaskDtoModel = new TicketingTaskDtoModel();
  dataModelResult: ErrorExceptionResult<TicketingTaskModel> = new ErrorExceptionResult<TicketingTaskModel>();
  dataModelResultDepartemen: ErrorExceptionResult<TicketingDepartemenModel> = new ErrorExceptionResult<TicketingDepartemenModel>();
  loadingStatus = false;
  formInfo: FormInfoModel = new FormInfoModel();
  singUpContentForm: FormGroup;
  captchaModel: CaptchaModel = new CaptchaModel();
  ngOnInit(): void {
    this.singUpContentForm = new FormGroup({
      status: new FormControl(null),
      title: new FormControl(null),

    });
    this.getDataDepartemen();
    this.onCaptchaOrder();
  }
  onCaptchaOrder(): void {
    this.dataModel.captchaText = '';
    this.coreAuthService.ServiceCaptcha().subscribe(
      (next) => {
        this.captchaModel = next.item;
        this.dataModel.captchaKey = this.captchaModel.key;
        const startDate = new Date();
        const endDate = new Date(next.item.expire);
        const seconds = (endDate.getTime() - startDate.getTime());
        setTimeout(() => {
          this.onCaptchaOrder();
        }, seconds);
      },
      (error) => {
        this.dataModel.captchaKey = '';
        this.captchaModel = new CaptchaModel();
      }
    );

  }
  getDataDepartemen(): void {
    this.ticketingDepartemenService.ServiceGetAll(null).subscribe((next) => {
      this.loadingStatus = false;
      this.formInfo.formSubmitAllow = !next.isSuccess;
      this.dataModelResultDepartemen = next;
      if (next.isSuccess) {
        this.dataModelResultDepartemen = next;
      } else {
        this.toasterService.typeErrorGetAll(next.errorMessage);
      }
    },
      (error) => {
        this.loadingStatus = false;
        this.formInfo.formSubmitAllow = true;
        this.toasterService.typeError(error);
      });
  }
  onFormSubmit(): void {
    if (this.singUpContentForm.valid) {
      this.formInfo.formSubmitAllow = false;
      this.DataAddContent();
    }
  }

  DataAddContent(): void {
    this.formInfo.formAlert = 'در حال ارسال اطلاعات به سرور';
    this.formInfo.formError = '';
    this.loadingStatus = true;
    this.ticketingTaskService
      .ServiceContactUS(this.dataModel)
      .subscribe(
        (next) => {
          this.loadingStatus = false;
          this.formInfo.formSubmitAllow = !next.isSuccess;
          this.dataModelResult = next;
          if (next.isSuccess) {
            this.formInfo.formAlert = 'ثبت با موفقت انجام شد';
            this.toasterService.typeSuccessAdd();
          } else {
            this.toasterService.typeErrorAdd(next.errorMessage);
          }
        },
        (error) => {
          this.loadingStatus = false;
          this.formInfo.formSubmitAllow = true;
          this.toasterService.typeError(error);
        }
      );
  }
}
