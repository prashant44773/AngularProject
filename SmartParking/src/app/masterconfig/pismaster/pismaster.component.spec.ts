import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PismasterComponent } from './pismaster.component';

describe('PismasterComponent', () => {
  let component: PismasterComponent;
  let fixture: ComponentFixture<PismasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PismasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PismasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
