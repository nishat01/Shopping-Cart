import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipToViewComponent } from './ship-to-view.component';

describe('ShipToViewComponent', () => {
  let component: ShipToViewComponent;
  let fixture: ComponentFixture<ShipToViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipToViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipToViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
