import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Directive,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { bindCallback, interval, Subscription, Observable } from 'rxjs';

// import { TAB, TAB_ID } from "../../../../providers/tab-id.provider";
import {
  CaptchaModel,
  CoreAuthService,
  LinkManagementTargetShortLinkGetDtoModel,
  LinkManagementTargetShortLinkGetResponceModel,
  LinkManagementTargetShortLinkSetDtoModel,
  LinkManagementTargetShortLinkSetResponceModel,
  TokenDeviceClientInfoDtoModel,
  TokenInfoModel,
} from 'ntk-cms-api';
import { LinkManagementTargetService } from 'ntk-cms-api/dist/cmsService/linkManagement/linkManagementTarget.service';
import { ComponentOptionModel } from '../../../core/cmsModels/componentOptionModel';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-link-management-short-link',
  templateUrl: './link-management-short-link.component.html',
  styleUrls: ['./link-management-short-link.component.css'],
})
export class LinkManagementShortLinkComponent implements OnInit, OnDestroy {
  message: string;
  messageShortLinkGet: string;
  messageShortLinkSetLink: string;
  messageShortLinkSetFile: string;
  messageShortLinkSetDescription: string;
  modelHistoryList: string[];
  constructor(
    // @Inject(TAB) readonly tab: any,
    // @Inject(TAB_ID) readonly tabId: number,
    private http: HttpClient,
    private coreAuthService: CoreAuthService,
    private linkManagementTargetService: LinkManagementTargetService,
    private activatedRoute: ActivatedRoute
  ) {}
  // emit value in sequence every 10 second
  source = interval(1000 * 60 * 5);

  submitted = false;
  subManager = new Subscription();
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
        '<b style="color: deepskyblue">Get</b> <i style="color: deeppink">Link</i>',
      key: 1,
      active: true,
    },
    {
      name:
        '<b style="color: deepskyblue">Set</b> <i style="color: deeppink">Link</i>',
      key: 2,
      active: false,
    },
    {
      name:
        '<b style="color: deepskyblue">Set</b> <i style="color: deeppink">File</i>',
      key: 3,
      active: false,
    },
    {
      name:
        '<b style="color: deepskyblue">Set</b> <i style="color: deeppink">Memo</i>',
      key: 4,
      active: false,
    },
    {
      name:
        '<b style="color: deepskyblue">Key</b> <i style="color: deeppink">History</i>',
      key: 5,
      active: false,
    },
  ];
  optionsUploadFile: ComponentOptionModel = new ComponentOptionModel();
  tokenInfoModel: TokenInfoModel;
  ngOnInit(): void {
    this.optionsUploadFile.actions = {
      onActionSelect: (model) => this.onActionSelectFile(model),
    };
    this.subManager = this.source.subscribe((val) => this.onCaptchaOrder());
    this.getHistory();
    // if (this.tab) this.modelTargetSetDto.UrlAddress = this.tab.url;

    this.coreAuthService.baseUrl = environment.configApiServerPath;
    this.linkManagementTargetService.baseUrl = environment.configApiServerPath;

    this.tokenInfoModel = this.activatedRoute?.snapshot?.data?.item
      ?.Item as TokenInfoModel;
    if (
      this.tokenInfoModel &&
      this.tokenInfoModel.DeviceToken &&
      this.tokenInfoModel.DeviceToken.length > 0
    ) {
      // this.coreAuthService.deviceToken = this.tokenInfoModel.DeviceToken;
      // this.linkManagementTargetService.deviceToken = this.tokenInfoModel.DeviceToken;
    }
    this.onCaptchaOrder();
  }
  ngOnDestroy(): void {
    this.subManager.unsubscribe();
  }
  onActionSelectFile(model: any): void {
    console.log('model', model);

    if (model && model.fileKey) {
      this.modelTargetSetDto.UploadFileKey = model.fileKey;
      this.uploadedfileName = model.fileName;
      if (this.uploadedfileKey.length > 0) {
        this.uploadedfileKey = this.uploadedfileKey + ',';
      }
      this.uploadedfileKey = this.uploadedfileKey + model.fileKey;
    }
  }

  onCaptchaOrder(): void {
    this.modelTargetSetDto.CaptchaText = '';
    this.modelTargetGetDto.CaptchaText = '';

    this.subManager.add(
      this.coreAuthService.ServiceCaptcha().subscribe(
        (next) => {
          this.captchaModel = next.Item;
          this.modelTargetSetDto.CaptchaKey = this.captchaModel.Key;
        },
        (error) => {
          this.message = 'خطا در دریافت عکس کپچا';
          this.modelTargetSetDto.CaptchaKey = '';
          this.captchaModel = new CaptchaModel();
        }
      )
    );
    // this.onCaptchaOrder2();
  }
  // onCaptchaOrder2() {
  //   this.coreAuthService.baseUrl ='http://localhost:2390/api/v1/';
  //   this.coreAuthService.s
  //   let model = new TokenDeviceClientInfoDtoModel();
  //   model.SecurityKey = '12345';
  //   this.subManager.add(
  //     this.coreAuthService.ServiceGetTokenDevice(model).subscribe(
  //       (next) => {},
  //       (error) => {
  //         this.message = 'خطا در دریافت عکس کپچا';
  //         this.modelTargetSetDto.CaptchaKey = '';
  //         this.captchaModel = new CaptchaModel();
  //       }
  //     )
  //   );
  // }
  onSubmitGet(): void {
    this.submitted = true;
    this.modelTargetSetResponceSetLink = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetFile = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetDescription = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetGetResponce = new LinkManagementTargetShortLinkGetResponceModel();
    this.modelTargetGetDto.CaptchaKey = this.captchaModel.Key;
    const res = this.modelTargetGetDto.Key.split('@');
    if (res.length < 2) {
      this.messageShortLinkGet = 'Key Is Worng.';
      return;
    }
    this.messageShortLinkGet = 'Runing ...';
    // this.linkManagementTargetService.baseUrl ='http://localhost:2390/api/v1/';
    this.subManager.add(
      this.linkManagementTargetService
        .ServiceShortLinkGet(this.modelTargetGetDto)
        .subscribe(
          (next) => {
            if (next.IsSuccess) {
              this.messageShortLinkGet = 'Is Success';
              this.modelTargetGetResponce = next.Item;
              this.addHistory(next.Item.Key);
            } else {
              this.messageShortLinkGet = next.ErrorMessage;
            }
            this.onCaptchaOrder();
          },
          (error) => {
            this.messageShortLinkGet = 'Error.';

            this.onCaptchaOrder();
          }
        )
    );
  }
  onSubmitSetLink(): void {
    this.messageShortLinkSetLink = 'Runing ...';

    this.submitted = true;
    this.modelTargetSetResponceSetLink = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetFile = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetDescription = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetGetResponce = new LinkManagementTargetShortLinkGetResponceModel();

    this.subManager.add(
      this.linkManagementTargetService
        .ServiceShortLinkSet(this.modelTargetSetDto)
        .subscribe(
          (next) => {
            if (next.IsSuccess) {
              this.messageShortLinkSetLink = 'Is Success';
              this.modelTargetSetResponceSetLink = next.Item;
              this.addHistory(next.Item.Key);
            } else {
              this.messageShortLinkSetLink = next.ErrorMessage;
            }
            this.onCaptchaOrder();
          },
          (error) => {
            this.messageShortLinkSetLink = 'Error ...';
            this.onCaptchaOrder();
          }
        )
    );
  }
  onSubmitSetDescription(): void {
    this.messageShortLinkSetDescription = 'Runing ...';

    this.submitted = true;
    this.modelTargetSetResponceSetLink = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetFile = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetDescription = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetGetResponce = new LinkManagementTargetShortLinkGetResponceModel();
    this.modelTargetSetDto.UrlAddress = '';
    this.modelTargetSetDto.UploadFileKey = '';
    this.subManager.add(
      this.linkManagementTargetService
        .ServiceShortLinkSet(this.modelTargetSetDto)
        .subscribe(
          (next) => {
            if (next.IsSuccess) {
              this.messageShortLinkSetDescription = 'Is Success';
              this.modelTargetSetResponceSetDescription = next.Item;
              this.addHistory(next.Item.Key);
            } else {
              this.messageShortLinkSetDescription = next.ErrorMessage;
            }
            this.onCaptchaOrder();
          },
          (error) => {
            this.messageShortLinkSetDescription = 'Error';
            this.onCaptchaOrder();
          }
        )
    );
  }
  onSubmitSetFile(): void {
    this.messageShortLinkSetFile = 'Runing ...';
    this.submitted = true;
    this.modelTargetSetResponceSetLink = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetFile = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetDescription = new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetGetResponce = new LinkManagementTargetShortLinkGetResponceModel();
    this.modelTargetSetDto.UrlAddress = '';
    this.modelTargetSetDto.Description = '';

    this.subManager.add(
      this.linkManagementTargetService
        .ServiceShortLinkSet(this.modelTargetSetDto)
        .subscribe(
          (next) => {
            if (next.IsSuccess) {
              this.messageShortLinkSetFile = 'Is Success';
              this.modelTargetSetResponceSetFile = next.Item;
              this.addHistory(next.Item.Key);
            } else {
              this.messageShortLinkSetFile = next.ErrorMessage;
            }
            this.onCaptchaOrder();
          },
          (error) => {
            this.messageShortLinkSetFile = 'Error';
            this.onCaptchaOrder();
          }
        )
    );
  }

  tabChange(selectedTab): void {
    this.modelTargetGetResponce = new LinkManagementTargetShortLinkGetResponceModel();
    this.modelTargetGetDto.Key = '';
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
      this.modelTargetGetDto.Key = item;
    }
  }
  addHistory(item: string): void {
    let history = localStorage.getItem('history');
    // debugger;
    if (history && history.length > 0) {
      if (history.indexOf(item) < 0) {
        history = history + ',' + item;
      }
    } else {
      history = item;
    }
    localStorage.setItem('history', history);
    this.modelHistoryList = history.split(',');
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
