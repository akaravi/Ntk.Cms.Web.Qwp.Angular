import { DeviceTypeEnum, OperatingSystemTypeEnum } from 'ntk-cms-api';
export const environment = {
  production: false,
  appVersion: '10.2.0811.1',
  cmsServerConfig: {
    configApiRetry: 1,
    configApiServerPath: 'https://apicms.ir/api/v2/',
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
