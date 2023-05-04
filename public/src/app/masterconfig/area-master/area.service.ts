import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Area} from './Area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  constructor(private area: HttpClient) {}

  readonly ApiUrl = 'https://localhost:44385/api/AreaMaster/';
  Get = this.ApiUrl + 'AreaMasterGet';
  Add = this.ApiUrl + 'AreaMasterAdd';
  Edit = this.ApiUrl + 'AreaMasterEdit';
  Del = this.ApiUrl + 'AreaMasterDel';
  Active = this.ApiUrl + 'AreaMasterActive';
  CityNameForDropdown = this.ApiUrl + 'AreaMasterGetCityNames';
  CollectorNameForDropdown = this.ApiUrl + 'AreaMasterCollectorNames';

  AreaMasterGet() {
    console.log('Service CityMaster is Running Get Method is Called');
    return this.area.get(this.Get);
  }

  AreaMasterAdd(formData: Area) {
    console.log('Sending the body to Api');
    return this.area.post(this.Add, formData);
  }

  AreaMasterEdit(formData: Area) {
    console.log(`The Object that we are Passing  : ${formData}`);
    console.log('Sending the body to Api Edit Method is Called');
    return this.area.put(this.Edit, formData);
  }

  AreaMasterDel(formData: Area) {
    console.log('Sending the body to Api');
    return this.area.post(this.Del,formData);
  }

  AreaMasterActive(formData: Area) {
    console.log('Sending the body to Api');
    return this.area.put(this.Active, formData);
  }

  AreaMasterCityName() {
    console.log('Service CityMaster is Running Get Method is Called');
    return this.area.get(this.CityNameForDropdown);
  }

  AreaMasterCollectorName() {
    console.log('Service CityMaster is Running Get Method is Called');
    return this.area.get(this.CollectorNameForDropdown);
  }
}
