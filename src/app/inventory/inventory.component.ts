import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';


@Component({
  selector: 'app-inventory',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, CommonModule, MatChipsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {

  inventoryItems = [
    {name: 'Paddy (unprocessed)', product_code: 'paddy'},
    {name: 'Husked rice (partially milled)', product_code: 'husked_rice'},
    {name: 'Polished rice (fully milled)', product_code: 'polished_rice'},
    {name: 'Cloth bags', product_code: 'cloth_bags'},
    {name: 'Plastic bags', product_code: 'plastic_bags'},
  ];

  addInventoryForm : {product_code:string, quantity:string, units: string, reason: string} = {
    product_code:'',
    quantity: '',
    units: '',
    reason:''
  }



  get invalidForm () {
    return !this.addInventoryForm.product_code || !this.addInventoryForm.quantity || !this.addInventoryForm.reason;
  }

  get unitsValue (): 'no.'|'kg' | '' {
    if(!this.addInventoryForm.product_code){
      return ''
    }
    return this.addInventoryForm.product_code === 'plastic_bags' || this.addInventoryForm.product_code === 'cloth_bags' ? 'no.' : 'kg'
  }

  onInventoryChange(event: MatSelectChange) {
    console.log('inventory select event :', event.value)
    this.addInventoryForm.product_code = event.value;
  }

  onUnitsChange(event: MatSelectChange) {
    console.log('unit select event :', event.value)
    this.addInventoryForm.product_code = event.value;
  }

  onQuanityChange(event: any) {
    this.addInventoryForm.quantity = event.target.value;
  }

  onInventoryUpdateReasonChange(event: any) {
    this.addInventoryForm.reason = event.target.value;
  }

  saveInventoryChanges() {
    this.addInventoryForm.units = this.unitsValue;
    console.log('save inventory clicked :', this.addInventoryForm);
  }

}
