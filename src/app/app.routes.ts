import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SearchInventoryComponent } from './inventory/search-inventory/search-inventory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesComponent } from './sales/sales.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { MyAccountComponent } from './my-account/my-account.component';

export const routes: Routes = [
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default route
{path: 'dashboard', component: DashboardComponent},
{path: 'inventory', component: SearchInventoryComponent},
{path: 'sales', component: SalesComponent},
{path: 'signin', component: SignInComponent},
{path: 'create-profile', component: CreateProfileComponent},
{path: 'my-account', component: MyAccountComponent},
];