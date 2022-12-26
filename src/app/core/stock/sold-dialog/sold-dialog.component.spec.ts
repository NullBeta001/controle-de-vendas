import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldDialogComponent } from './sold-dialog.component';

describe('SoldDialogComponent', () => {
  let component: SoldDialogComponent;
  let fixture: ComponentFixture<SoldDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
