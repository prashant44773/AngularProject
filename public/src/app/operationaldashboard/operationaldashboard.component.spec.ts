import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationaldashboardComponent } from './operationaldashboard.component';

describe('OperationaldashboardComponent', () => {
  let component: OperationaldashboardComponent;
  let fixture: ComponentFixture<OperationaldashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationaldashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationaldashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
