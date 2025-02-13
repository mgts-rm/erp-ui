import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SearchInventoryComponent } from './inventory/search-inventory/search-inventory.component';

export const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
{path: 'home', component: LayoutComponent},
{path: 'inventory', component: SearchInventoryComponent},
];