import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreAboutUsComponent } from './pages/core/core-about-us/core-about-us.component';
import { CoreContactUsComponent } from './pages/core/core-contact-us/core-contact-us.component';
import { LinkManagementShortLinkComponent } from './pages/linkManagement/link-management-short-link/link-management-short-link.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LinkManagementShortLinkComponent,
  },
  {
    path: 'aboutus',
    // pathMatch: 'full',
    component: CoreAboutUsComponent,
  },
  {
    path: 'countactus',
    // pathMatch: 'full',
    component: CoreContactUsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
