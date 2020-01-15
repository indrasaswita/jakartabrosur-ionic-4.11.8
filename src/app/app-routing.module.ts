import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'tabs',
		loadChildren: './tabs/tabs.module#TabsPageModule'
	},
	{
		path: '',
		loadChildren: './login/login.module#LoginPageModule'
	},
	{
		path: 'signup',
		loadChildren: './signup/signup.module#SignupPageModule'
	},
	{
		path: 'popup/addprice',
		loadChildren: './pricelist/addprice/addprice.module#AddpricePageModule'
	},
	{ path: 'alluser', loadChildren: './alluser/alluser.module#AlluserPageModule' },
	{ path: 'master', loadChildren: './master/master.module#MasterPageModule' },
	{ path: 'carts', loadChildren: './carts/carts.module#CartsPageModule' },
	{ path: 'cartdetails', loadChildren: './cartdetails/cartdetails.module#CartdetailsPageModule' },
	
	{ path: 'sales', loadChildren: './sales/sales.module#SalesPageModule' },
	{ path: 'saledetails', loadChildren: './saledetails/saledetails.module#SaledetailsPageModule' },
	{ path: 'employee', loadChildren: './employee/employee.module#EmployeePageModule' },
	{ path: 'customer', loadChildren: './customer/customer.module#CustomerPageModule' },
	{ path: 'customerpayment', loadChildren: './customerpayment/customerpayment.module#CustomerpaymentPageModule' },
	{ path: 'customersales', loadChildren: './customersales/customersales.module#CustomersalesPageModule' },
	{ path: 'addnewcustomer', loadChildren: './addnewcustomer/addnewcustomer.module#AddnewcustomerPageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  { path: 'confirmationbyemployee', loadChildren: './confirmationbyemployee/confirmationbyemployee.module#ConfirmationbyemployeePageModule' },
  { path: 'cetaksuratjalan', loadChildren: './cetaksuratjalan/cetaksuratjalan.module#CetaksuratjalanPageModule' }

];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
