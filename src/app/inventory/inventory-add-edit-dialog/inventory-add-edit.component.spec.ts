import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAddEditDialogComponent } from './inventory-add-edit.component';

describe('InventoryAddEditDialogComponent', () => {
  let component: InventoryAddEditDialogComponent;
  let fixture: ComponentFixture<InventoryAddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryAddEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
