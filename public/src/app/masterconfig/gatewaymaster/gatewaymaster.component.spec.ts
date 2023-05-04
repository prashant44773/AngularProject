import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaymasterComponent } from './gatewaymaster.component';

describe('GatewaymasterComponent', () => {
  let component: GatewaymasterComponent;
  let fixture: ComponentFixture<GatewaymasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewaymasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatewaymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
