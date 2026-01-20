import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
// import { TAB, TAB_ID } from "../../../../providers/tab-id.provider";
import {
  CaptchaModel,
  CoreAuthService,
  ErrorExceptionResult,
  FileUploadedModel,
  LinkManagementTargetService,
  LinkManagementTargetShortLinkGetDtoModel,
  LinkManagementTargetShortLinkGetResponceModel,
  LinkManagementTargetShortLinkSetDtoModel,
  LinkManagementTargetShortLinkSetResponceModel,
  TokenInfoModel,
} from 'ntk-cms-api';

import { ComponentOptionModel } from '../../../core/cmsModels/componentOptionModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-link-management-short-link',
  templateUrl: './link-management-short-link.component.html',
  styleUrls: ['./link-management-short-link.component.css'],
  standalone: false
})
export class LinkManagementShortLinkComponent implements OnInit {
  constructor(
    private coreAuthService: CoreAuthService,
    private linkManagementTargetService: LinkManagementTargetService,
    private activatedRoute: ActivatedRoute
  ) { }
  message: string;
  messageShortLinkGet: string;
  messageShortLinkSetLink: string;
  messageShortLinkSetFile: string;
  messageShortLinkSetDescription: string;
  modelHistoryList: string[];


  submitted = false;

  captchaModel: CaptchaModel = new CaptchaModel();
  modelTargetGetDto: LinkManagementTargetShortLinkGetDtoModel = new LinkManagementTargetShortLinkGetDtoModel();
  modelTargetGetResponce: LinkManagementTargetShortLinkGetResponceModel = new LinkManagementTargetShortLinkGetResponceModel();
  modelTargetSetDto: LinkManagementTargetShortLinkSetDtoModel = new LinkManagementTargetShortLinkSetDtoModel();

  modelTargetSetResponceSetLink: LinkManagementTargetShortLinkSetResponceModel = new LinkManagementTargetShortLinkSetResponceModel();
  modelTargetSetResponceSetFile: LinkManagementTargetShortLinkSetResponceModel = new LinkManagementTargetShortLinkSetResponceModel();
  modelTargetSetResponceSetDescription: LinkManagementTargetShortLinkSetResponceModel = new LinkManagementTargetShortLinkSetResponceModel();
  fileToUpload: File = null;
  selectedUserTab = 1;

  uploadedfileName = '';
  uploadedfileKey = '';
  tabs = [
    {
      name:
        '<i style="color: deeppink">دریافت لینک</i>',
      key: 1,
      active: true,
    },
    {
      name:
        '<i style="color: deeppink">ارسال لینک</i>',
      key: 2,
      active: false,
    },
    {
      name:
        '<i style="color: deeppink">ارسال فایل</i>',
      key: 3,
      active: false,
    },
    {
      name:
        '<i style="color: deeppink">ارسال پیام</i>',
      key: 4,
      active: false,
    },
    {
      name:
        '<i style="color: deeppink">تاریخچه</i>',
      key: 5,
      active: false,
    },
  ];
  optionsUploadFile: ComponentOptionModel = new ComponentOptionModel();
  tokenInfoModel: TokenInfoModel;
  aoutoCaptchaOrder = 1;
  ngOnInit(): void {
    this.optionsUploadFile.actions = {
      onActionSelect: (model) => this.onActionSelectFile(model),
    };

    this.getHistory();
    this.tokenInfoModel = this.activatedRoute?.snapshot?.data?.item
      ?.item as TokenInfoModel;
    this.onCaptchaOrder();
    // if (this.tab) this.modelTargetSetDto.urlAddress = this.tab.url;
  }

  onActionSelectFile(model: ErrorExceptionResult<FileUploadedModel>): void {
    // console.log('model', model);
    if (model && !model.isSuccess) {
      this.message = 'خطا در دریافت عکس کپچا';
      return;
    }
    if (model && model.isSuccess && model.item.fileKey) {
      this.modelTargetSetDto.uploadFileGUID = model.item.fileKey;
      this.uploadedfileName = model.item.fileName;
      if (this.uploadedfileKey?.length > 0) {
        this.uploadedfileKey = this.uploadedfileKey + ',';
      }
      this.uploadedfileKey = this.uploadedfileKey + model.item.fileKey;
    }
  }
  onCaptchaOrder(): void {
    this.modelTargetSetDto.captchaText = '';
    this.modelTargetGetDto.captchaText = '';
    this.coreAuthService.ServiceCaptcha().subscribe(
      (next) => {
        this.captchaModel = next.item;
        this.modelTargetSetDto.captchaKey = this.captchaModel.key;
        const startDate = new Date();
        const endDate = new Date(next.item.expire);
        const seconds = (endDate.getTime() - startDate.getTime());
        if (this.aoutoCaptchaOrder < 10) {
          this.aoutoCaptchaOrder = this.aoutoCaptchaOrder + 1;
          setTimeout(() => { this.onCaptchaOrder(); }, seconds);
        }
      },
      () => {
        this.message = 'خطا در دریافت عکس کپچا';
        this.modelTargetSetDto.captchaKey = '';
        this.captchaModel = new CaptchaModel();
      }
    );

  }

  onSubmitGet(): void {
    this.submitted = true;
    this.modelTargetSetResponceSetLink = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetFile = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetDescription = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetGetResponce = new LinkManagementTargetShortLinkGetResponceModel();
    this.modelTargetGetDto.captchaKey = this.captchaModel.key;
    const res = this.modelTargetGetDto.key.split('@');
    if (res?.length < 2) {
      this.messageShortLinkGet = 'Key Is Worng.';
      return;
    }
    this.messageShortLinkGet = 'Runing ...';

    this.linkManagementTargetService
      .ServiceShortLinkGet(this.modelTargetGetDto)
      .subscribe(
        (next) => {
          if (next.isSuccess) {
            this.messageShortLinkGet = 'Is Success';
            this.modelTargetGetResponce = next.item;
            this.addHistory(next.item.key);
          } else {
            this.messageShortLinkGet = next.errorMessage;
          }
          this.onCaptchaOrder();
        },
        () => {
          this.messageShortLinkGet = 'Error.';

          this.onCaptchaOrder();
        }
      );
  }
  onSubmitSetLink(): void {
    this.messageShortLinkSetLink = 'Runing ...';

    this.submitted = true;
    this.modelTargetSetResponceSetLink = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetFile = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetDescription = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetGetResponce = new LinkManagementTargetShortLinkGetResponceModel();


    this.linkManagementTargetService
      .ServiceShortLinkSet(this.modelTargetSetDto)
      .subscribe(
        (next) => {
          if (next.isSuccess) {
            this.messageShortLinkSetLink = 'Is Success';
            this.modelTargetSetResponceSetLink = next.item;
            this.addHistory(next.item.key);
          } else {
            this.messageShortLinkSetLink = next.errorMessage;
          }
          this.onCaptchaOrder();
        },
        () => {
          this.messageShortLinkSetLink = 'Error ...';
          this.onCaptchaOrder();
        }
      );

  }
  onSubmitSetDescription(): void {
    this.messageShortLinkSetDescription = 'Runing ...';

    this.submitted = true;
    this.modelTargetSetResponceSetLink = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetFile = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetDescription = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetGetResponce = new LinkManagementTargetShortLinkGetResponceModel();
    this.modelTargetSetDto.urlAddress = '';
    this.modelTargetSetDto.uploadFileGUID = '';

    this.linkManagementTargetService
      .ServiceShortLinkSet(this.modelTargetSetDto)
      .subscribe(
        (next) => {
          if (next.isSuccess) {
            this.messageShortLinkSetDescription = 'Is Success';
            this.modelTargetSetResponceSetDescription = next.item;
            this.addHistory(next.item.key);
          } else {
            this.messageShortLinkSetDescription = next.errorMessage;
          }
          this.onCaptchaOrder();
        },
        () => {
          this.messageShortLinkSetDescription = 'Error';
          this.onCaptchaOrder();
        }
      );

  }
  onSubmitSetFile(): void {
    this.messageShortLinkSetFile = 'Runing ...';
    this.submitted = true;
    this.modelTargetSetResponceSetLink = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetFile = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetDescription = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetGetResponce = new LinkManagementTargetShortLinkGetResponceModel();
    this.modelTargetSetDto.urlAddress = '';
    this.modelTargetSetDto.description = '';


    this.linkManagementTargetService
      .ServiceShortLinkSet(this.modelTargetSetDto)
      .subscribe(
        (next) => {
          if (next.isSuccess) {
            this.messageShortLinkSetFile = 'Is Success';
            this.modelTargetSetResponceSetFile = next.item;
            this.addHistory(next.item.key);
          } else {
            this.messageShortLinkSetFile = next.errorMessage;
          }
          this.onCaptchaOrder();
        },
        () => {
          this.messageShortLinkSetFile = 'Error';
          this.onCaptchaOrder();
        }
      );

  }

  tabChange(selectedTab): void {
    this.modelTargetGetResponce = new LinkManagementTargetShortLinkGetResponceModel();
    this.modelTargetGetDto.key = '';
    this.selectedUserTab = selectedTab.key;
    for (const tab of this.tabs) {
      if (tab.key === selectedTab.key) {
        tab.active = true;
      } else {
        tab.active = false;
      }
    }
  }
  /* To copy Text from Textbox */
  copyInputMessage(inputElement): void {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  /* To copy any Text */
  copyText(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  onClickHistory(item: string): void {
    if (item && item.length > 0) {
      this.tabChange({ key: 1 });
      this.modelTargetGetDto.key = item;
    }
  }
  addHistory(item: string): void {
    let history = localStorage.getItem('history');
    // debugger;
    if (history && history.length > 0) {
      if (history.indexOf(item) < 0) {
        history = item + ',' + history;
      }
    } else {
      history = item;
    }

    this.modelHistoryList = history.split(',');
    if (this.modelHistoryList?.length > 10) {
      this.modelHistoryList.length = 10;
    }
    localStorage.setItem('history', this.modelHistoryList.join(','));
  }
  getHistory(): void {
    let history = localStorage.getItem('history');
    if (history && history.length > 0) {
      this.modelHistoryList = history.split(',');
      return;
    }
    history = '';
    localStorage.setItem('history', history);
    this.modelHistoryList = history.split(',');
  }
}
