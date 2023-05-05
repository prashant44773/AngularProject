import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingmapComponent } from './parkingmap.component';

describe('ParkingmapComponent', () => {
  let component: ParkingmapComponent;
  let fixture: ComponentFixture<ParkingmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingmapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
