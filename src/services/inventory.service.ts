import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryDataType } from '../app/inventory/inventory.model';
Observable

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  findInventory(productName?: string):Observable<InventoryDataType[]> {
    if(!productName) {
      return this.http.get<any[]>(`/search`);
    }
    let params = new HttpParams();
    params = params.set('product_name', productName);
    return this.http.get<any[]>(`/inventory-basic/search`, { params }); 
  }

  addOrUpdateInventory(action: 'add'|'edit', inventoryItem?: InventoryDataType) {
    if(action === 'add') {
      return this.addInventory(inventoryItem);
    }
    return this.updateInventory(inventoryItem);
  }

  addInventory(inventoryItem?: InventoryDataType):Observable<any> {
    return this.http.post<any[]>(`/inventory-basic`, inventoryItem); 
  }

  updateInventory(inventoryItem?: InventoryDataType):Observable<any> {
    return this.http.put<any[]>(`/inventory-basic`, inventoryItem); 
  }

  deleteInventory(inventoryItem?: InventoryDataType):Observable<any> {
    return this.http.delete<any[]>(`/inventory-basic/${inventoryItem?.product_code}`); 
  }
}
