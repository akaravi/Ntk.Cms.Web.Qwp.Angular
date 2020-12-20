import { EnumDeviceType, EnumOperatingSystemType } from 'ntk-cms-api';
export const environment = {
  production: false,
  cmsServerConfig : {
    configApiRetry: 1,
    configApiServerPath: 'https://apicms.ir/api/v1/',
    configApiServerPath_: 'https://1b4c3712df1f.ngrok.io/api/v1/',
    configRouteUploadFileContent: 'https://apifile.ir/api/v1/upload/',
  },
  cmsTokenConfig : {
    SecurityKey: 'qwp123456',
    ClientMACAddress: '',
    OSType: EnumOperatingSystemType.Windows,
    DeviceType: EnumDeviceType.WebSite,
    PackageName: '',
  }
};
