import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaremasterComponent } from './faremaster.component';

describe('FaremasterComponent', () => {
  let component: FaremasterComponent;
  let fixture: ComponentFixture<FaremasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaremasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaremasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
