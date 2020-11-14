import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CaptchaModel, CoreAuthService, ErrorExcptionResult, FormInfoModel,
  TicketingDepartemenModel, TicketingDepartemenService, TicketingTaskDtoModel, TicketingTaskModel, TicketingTaskService
} from 'ntk-cms-api';

import { CmsToastrService } from 'src/app/core/base/cmsToastr.service';

@Component({
  selector: 'app-core-contact-us',
  templateUrl: './core-contact-us.component.html',
  styleUrls: ['./core-contact-us.component.css']
})
export class CoreContactUsComponent implements OnInit {

  constructor(private ticketingTaskService: TicketingTaskService,
              private coreAuthService: CoreAuthService,
              private ticketingDepartemenService: TicketingDepartemenService,
              private toasterService: CmsToastrService) { }
  dataModel: TicketingTaskDtoModel = new TicketingTaskDtoModel();
  dataModelResult: ErrorExcptionResult<TicketingTaskModel> = new ErrorExcptionResult<TicketingTaskModel>();
  dataModelResultDepartemen: ErrorExcptionResult<TicketingDepartemenModel> = new ErrorExcptionResult<TicketingDepartemenModel>();
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
    this.dataModel.CaptchaText = '';
    this.coreAuthService.ServiceCaptcha().subscribe(
      (next) => {
        this.captchaModel = next.Item;
        this.dataModel.CaptchaKey = this.captchaModel.Key;
        const startDate = new Date();
        const endDate = new Date(next.Item.Expire);
        const seconds = (endDate.getTime() - startDate.getTime());
        setTimeout(() => {
          this.onCaptchaOrder();
        }, seconds);
      },
      (error) => {
        this.dataModel.CaptchaKey = '';
        this.captchaModel = new CaptchaModel();
      }
    );

  }
  getDataDepartemen(): void {
    this.ticketingDepartemenService.ServiceGetAll(null).subscribe((next) => {
      this.loadingStatus = false;
      this.formInfo.FormAllowSubmit = !next.IsSuccess;
      this.dataModelResultDepartemen = next;
      if (next.IsSuccess) {
        this.dataModelResultDepartemen = next;
      } else {
        this.toasterService.typeErrorGetAll(next.ErrorMessage);
      }
    },
      (error) => {
        this.loadingStatus = false;
        this.formInfo.FormAllowSubmit = true;
        this.toasterService.typeError(error);
      });
  }
  onFormSubmit(): void {
    if (this.singUpContentForm.valid) {
      this.formInfo.FormAllowSubmit = false;
      this.DataAddContent();
    }
  }

  DataAddContent(): void {
    this.formInfo.FormAlert = 'در حال ارسال اطلاعات به سرور';
    this.formInfo.FormError = '';
    this.loadingStatus = true;
    this.ticketingTaskService
      .ServiceContactUS(this.dataModel)
      .subscribe(
        (next) => {
          this.loadingStatus = false;
          this.formInfo.FormAllowSubmit = !next.IsSuccess;
          this.dataModelResult = next;
          if (next.IsSuccess) {
            this.formInfo.FormAlert = 'ثبت با موفقت انجام شد';
            this.toasterService.typeSuccessAdd();
          } else {
            this.toasterService.typeErrorAdd(next.ErrorMessage);
          }
        },
        (error) => {
          this.loadingStatus = false;
          this.formInfo.FormAllowSubmit = true;
          this.toasterService.typeError(error);
        }
      );
  }
}
