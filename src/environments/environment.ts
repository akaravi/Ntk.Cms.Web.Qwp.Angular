import { DeviceTypeEnum, OperatingSystemTypeEnum } from 'ntk-cms-api';
export const environment = {
  production: false,
  appVersion: '10.0.0000.0',
  cmsServerConfig: {
    configApiRetry: 1,
    configApiServerPath: 'https://apicms.ir/api/v2/',
    configApiServerPath_: 'https://1b4c3712df1f.ngrok.io/api/v2/',
    configRouteUploadFileContent: 'https://apifile.ir/api/v2/upload/',
  },
  cmsTokenConfig: {
    SecurityKey: 'qwp123456',
    ClientMACAddress: '',
    OSType: OperatingSystemTypeEnum.Windows,
    DeviceType: DeviceTypeEnum.WebSite,
    PackageName: '',
  }
};
