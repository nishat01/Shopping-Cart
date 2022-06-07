import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishViewComponent } from './finish-view.component';

describe('FinishViewComponent', () => {
  let component: FinishViewComponent;
  let fixture: ComponentFixture<FinishViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
