import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensormasterComponent } from './sensormaster.component';

describe('SensormasterComponent', () => {
  let component: SensormasterComponent;
  let fixture: ComponentFixture<SensormasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensormasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensormasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
