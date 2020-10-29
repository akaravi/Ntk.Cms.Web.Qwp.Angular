import { Injectable } from '@angular/core';
import {  Resolve} from '@angular/router';
import {
  CoreAuthService,
  EnumDeviceType,
  EnumOperatingSystemType,
  ErrorExcptionResult,
  TokenDeviceClientInfoDtoModel,
  TokenInfoModel,
} from 'ntk-cms-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppResolver
  implements Resolve<ErrorExcptionResult<TokenInfoModel>> {
  constructor(private service: CoreAuthService) {}

  resolve(): Observable<ErrorExcptionResult<TokenInfoModel>> {
    const model: TokenDeviceClientInfoDtoModel = {
      SecurityKey: '123456789',
      ClientMACAddress: '',
      OSType: EnumOperatingSystemType.Windows,
      DeviceType: EnumDeviceType.WebSite,
      PackageName: '',
    };
    return this.service.ServiceGetTokenDevice(model);
  }
}
