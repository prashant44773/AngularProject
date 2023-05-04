import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingmasterComponent } from './settingmaster.component';

describe('SettingmasterComponent', () => {
  let component: SettingmasterComponent;
  let fixture: ComponentFixture<SettingmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
