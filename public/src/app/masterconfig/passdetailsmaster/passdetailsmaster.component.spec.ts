import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassdetailsmasterComponent } from './passdetailsmaster.component';

describe('PassdetailsmasterComponent', () => {
  let component: PassdetailsmasterComponent;
  let fixture: ComponentFixture<PassdetailsmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassdetailsmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassdetailsmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
