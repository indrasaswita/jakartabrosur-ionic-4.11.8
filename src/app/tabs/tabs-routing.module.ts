import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'p',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../about/about.module').then(m => m.AboutPageModule)
          }
        ]
      },
      {
        path: 'contact',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../contact/contact.module').then(m => m.ContactPageModule)
          }
        ]
      },
      {
        path: 'salelist',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../salelist/salelist.module').then(m => m.SalelistPageModule)
          }
        ]
      },
      {
        path: 'pricelist',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pricelist/pricelist.module').then(m => m.PricelistPageModule)
          }
        ]
      },
      {
        path: 'customer',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../customer/customer.module').then(m => m.CustomerPageModule)
          }
        ]
      },
      {
        path: 'notification',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../notification/notification.module').then(m => m.NotificationPageModule)
          }
        ]
      },
      {
        path: 'master',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../master/master.module').then(m => m.MasterPageModule)
          }
        ]
      },
      {
        path: 'alluser',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../alluser/alluser.module').then(m => m.AlluserPageModule)
          }
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../user/user.module').then(m => m.UserPageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
