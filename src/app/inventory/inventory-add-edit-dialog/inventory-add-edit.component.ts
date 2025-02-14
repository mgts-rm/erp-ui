import {
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Signal,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { InventoryDataType } from "../inventory.model";
import { MatSelectChange, MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { InventoryService } from "../../../services/inventory.service";

@Component({
  selector: "app-inventory-add-edit",
  templateUrl: "./inventory-add-edit.component.html",
  styleUrl: "./inventory-add-edit.component.scss",
  imports: [CommonModule],
})
export class InventoryAddEditDialogComponent implements AfterContentInit {
  @Input() inventoryItem: InventoryDataType = {
    product_code: "",
    product_name: "",
    quantity: "",
    units: "",
    reason: "",
  };
  @Input() action?: "add" | "edit";
  @Input() displayAddOrEditInventory!: WritableSignal<Boolean>;


  readonly dialog = inject(MatDialog);

  inventoryDataForDialog?: Signal<InventoryDataType>;
  addEditInventoryDialogClose = new EventEmitter<any>();

  constructor() {}

  ngAfterContentInit(): void {
    this.inventoryDataForDialog = signal(this.inventoryItem);
    const dialogRef = this.dialog.open(DialogAddEditInventory, {
      data: {inventory: this.inventoryDataForDialog(), action: this.action}
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.displayAddOrEditInventory.set(false);
    });
  }
}

@Component({
  selector: "dialog-add-edit-inventory",
  templateUrl: "dialog.html",
  styleUrl: "./inventory-add-edit.component.scss",
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
})
export class DialogAddEditInventory {
  readonly dialogRef = inject(MatDialogRef<DialogAddEditInventory>);
  readonly data = inject<{inventory: InventoryDataType, action: 'add' | 'edit'}>(MAT_DIALOG_DATA);
  selectedInventory?: { product_code: string; product_name: string };

  inventoryItems = [
    { product_name: "Paddy (unprocessed)",
      product_code: "550e8400-e29b-41d4-a716-446655440000" 
    },
    {
      product_name: "Husked rice (partially milled)",
      product_code: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    },
    {
      product_name: "Polished rice (fully milled)",
      product_code: "9a8b7c6d-1234-4ef0-b89a-abcdef123456",
    },
    { 
      product_name: "Cloth bags",
      product_code: "3fa85f64-5717-4562-b3fc-2c963f66afa6" 
    },
    { 
      product_name: "Plastic bags",
      product_code: "16fd2706-8baf-433b-82eb-8c7fada847da"
    },
  ];
  unitsValue: string = "";
  saveInProgress?: boolean;

  get inventoryValueSelected (){
    if(!this.data.inventory.product_code) {
      return;
    }
    const value = this.inventoryItems.find(item =>item.product_code === this.data.inventory.product_code);
    return value;
  }
  get disableSaveButton () {
    return !this.data.inventory.product_code || !this.data.inventory.product_code || !this.data.inventory.quantity || ! this.data.inventory.reason || ! this.data.inventory.units || this.saveInProgress;
  }

  constructor(private inventoryService: InventoryService){}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onInventoryChange(event: MatSelectChange) {
    const itemSelected = event.value;

    // reset quantity and units on inventory change.
    this.data.inventory.quantity = '';
    this.data.inventory.units = '';

    // reset reason on quantity change.
    this.data.inventory.reason = '';

    // set product code and product name from the inventory selected in dropdown
    this.data.inventory.product_code = itemSelected.product_code;
    this.data.inventory.product_name = itemSelected.product_name;

    // set units of inventory quantity based on the type of inventory item
    const unitValue =
      itemSelected.product_code === "plastic_bags" ||
      itemSelected.product_code === "cloth_bags"
        ? "no."
        : "kg";
    this.unitsValue = unitValue;
    this.data.inventory.units = unitValue;
  }

  onQuanityChange(event: any) {
    this.data.inventory.quantity = event.target.value;
  }

  onInventoryUpdateReasonChange(event: any) {
    this.data.inventory.reason = event.target.value;
  }

  saveInventory() {
    this.saveInProgress = true;
    this.inventoryService.addOrUpdateInventory(this.data.action, this.data.inventory).subscribe(res=> {
        console.log('add or update successful :', res);
        this.saveInProgress =  false;
        this.closeDialog(); 

    }, error=> {
        console.log('add or update error :', error);
        this.saveInProgress =  false;
        this.closeDialog(); 
    })
  }
}
