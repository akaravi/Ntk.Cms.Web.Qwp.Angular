import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreAboutUsComponent } from './pages/core/core-about-us/core-about-us.component';
import { CoreContactUsComponent } from './pages/core/core-contact-us/core-contact-us.component';
import { LinkManagementShortLinkComponent } from './pages/linkManagement/link-management-short-link/link-management-short-link.component';
import { NewsContentListComponent } from './pages/news/news-content-list/news-content-list.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    component: LinkManagementShortLinkComponent,
    // resolve: {item: AppResolver}
  },
  {
    path: 'aboutus',
    // pathMatch: 'full',
    component: CoreAboutUsComponent,
  },
  {
    path: 'contactus',
    // pathMatch: 'full',
    component: CoreContactUsComponent,
  },
  {
    path: 'news',
    // pathMatch: 'full',
    component: NewsContentListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {}
