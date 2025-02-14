import { Component, OnInit, inject, model, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';

import { InventoryDataType, InventoryItem } from '../inventory.model';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryAddEditDialogComponent } from '../inventory-add-edit-dialog/inventory-add-edit.component';

@Component({
  selector: 'app-search-inventory',
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatCardModule, MatTableModule, MatMenuModule, InventoryAddEditDialogComponent],
  templateUrl: './search-inventory.component.html',
  styleUrl: './search-inventory.component.scss'
})
export class SearchInventoryComponent implements OnInit {
  searchInventoryValue?: string;
  inventoryData?:InventoryDataType[];
  displayedColumns: string[] = ['name', 'quantity', 'action'];
  displayAddOrEditInventory = signal(false);
  inventoryAction?: 'add' |  'edit';
  editableInventoryDataItem!: InventoryDataType;
  constructor(private inventoryService: InventoryService){}


  ngOnInit(): void {
    this.searchInventory(this.searchInventoryValue);
  }

  searchInventory(name?: string) {
    this.inventoryService.findInventory(name).subscribe((res:InventoryDataType[])=> {
      this.inventoryData = res;
    }, error=> {
      console.log('Error while getting inventory data :', error);
      this.setDummyData();
    });
  }

  setDummyData() {
    this.inventoryData = [
      {product_name: 'Paddy (unprocessed)', product_code: 'paddy', quantity: '0', units: 'kg', reason: 'dummy reason 1'},
      {product_name: 'Plastic bags', product_code: 'plastic_bags', quantity: '1', units: 'no.', reason: 'dummy reason 2'}
    ]
  }

  getAllInventory() {

  }

  searchClicked() {
    if(!this.searchInventoryValue) {
      return;
    }
    this.searchInventory(this.searchInventoryValue);
    console.log('searchInventoryValue :', this.searchInventoryValue);
  }

  addNewInventory() {
    this.displayAddOrEditInventory.set(true);
    this.inventoryAction = 'add';
    this.editableInventoryDataItem = {...InventoryItem};
  }

  editInventory(inventoryItem: InventoryDataType) {
    this.displayAddOrEditInventory.set(true);
    this.inventoryAction = 'edit';
    this.editableInventoryDataItem = {...inventoryItem};
  }


  historyOfInventory(inventoryItem: InventoryDataType) {
    console.log('history of inventory item :', inventoryItem);
  }
}

