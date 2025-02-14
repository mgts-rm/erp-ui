import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { InventoryDataType } from '../app/inventory/inventory.model';
import { environment } from '../config';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = environment.apiUrl;

  inventoryUpdateEvent = new Subject<{status:'success'|'error', action:string, message?: string}>();

  constructor(private http: HttpClient) { }

  findInventory(productName?: string):Observable<InventoryDataType[]> {
    if(!productName) {
      return this.http.get<any[]>(`${this.baseUrl}/inventory-basic/search`);
    }
    let params = new HttpParams();
    params = params.set('product_name', productName);
    return this.http.get<any[]>(`${this.baseUrl}/inventory-basic/search`, { params }); 
  }

  addOrUpdateInventory(action: 'add'|'edit', inventoryItem: InventoryDataType) {
    if(action === 'add') {
      return this.addInventory(inventoryItem);
    }
    return this.updateInventory(inventoryItem);
  }

  addInventory(inventoryItem?: InventoryDataType):Observable<any> {
    return this.http.post<any[]>(`${this.baseUrl}/inventory-basic`, inventoryItem); 
  }

  updateInventory(inventoryItem: InventoryDataType):Observable<any> {
    // let params = new HttpParams();
    // params = params.set('product_code', inventoryItem.product_code);
    return this.http.put<any[]>(`${this.baseUrl}/inventory-basic/${inventoryItem.product_code}`, inventoryItem); 
  }

  deleteInventory(inventoryItem?: InventoryDataType):Observable<any> {
    return this.http.delete<any[]>(`${this.baseUrl}/inventory-basic/${inventoryItem?.product_code}`); 
  }
}
