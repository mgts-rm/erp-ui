import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-inventory',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {

  inventoryForm : {item:string, quantity:string, reason: string} = {
    item:'polished_rice',
    quantity: '',
    reason:''
  }

  onInventoryChange(event: MatSelectChange) {
    console.log('inventory select event :', event.value)
    this.inventoryForm.item = event.value;
  }

  onQuanityChange(event: any) {
    this.inventoryForm.quantity = event.target.value;
  }

  onInventoryUpdateReasonChange(event: any) {
    this.inventoryForm.reason = event.target.value;
  }

  saveInventoryChanges() {
    console.log('save inventory clicked :', this.inventoryForm);
  }

}
