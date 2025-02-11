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
    {product_name: 'Paddy (unprocessed)', product_code: 'paddy'},
    {product_name: 'Husked rice (partially milled)', product_code: 'husked_rice'},
    {product_name: 'Polished rice (fully milled)', product_code: 'polished_rice'},
    {product_name: 'Cloth bags', product_code: 'cloth_bags'},
    {product_name: 'Plastic bags', product_code: 'plastic_bags'},
  ];

  addInventoryForm : {product_code:string, product_name: string, quantity:string, units: string, reason: string} = {
    product_code:'',
    product_name: '',
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
    const itemSelected = event.value;
    this.addInventoryForm.product_code = itemSelected.product_code;
    this.addInventoryForm.product_name = itemSelected.product_name;
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
