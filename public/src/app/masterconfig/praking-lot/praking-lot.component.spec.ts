import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrakingLotComponent } from './praking-lot.component';

describe('PrakingLotComponent', () => {
  let component: PrakingLotComponent;
  let fixture: ComponentFixture<PrakingLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrakingLotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrakingLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
