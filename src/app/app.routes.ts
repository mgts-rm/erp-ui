import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
{path: 'home', component: LayoutComponent},
{path: 'inventory', component: InventoryComponent},
];