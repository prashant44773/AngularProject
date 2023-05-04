import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserassignmentComponent } from './userassignment.component';

describe('UserassignmentComponent', () => {
  let component: UserassignmentComponent;
  let fixture: ComponentFixture<UserassignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserassignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
