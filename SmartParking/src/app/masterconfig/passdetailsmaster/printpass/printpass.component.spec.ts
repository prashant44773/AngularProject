import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintpassComponent } from './printpass.component';

describe('PrintpassComponent', () => {
  let component: PrintpassComponent;
  let fixture: ComponentFixture<PrintpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintpassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
