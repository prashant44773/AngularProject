import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { City } from './cityModel';

@Injectable({
  providedIn: 'root',
})
export class CityMasterService {
  constructor(private city: HttpClient) {}

  readonly ApiUrl = 'https://localhost:44385/api/CityMaster/';
  Get = this.ApiUrl + 'CityMasterGet';
  Add = this.ApiUrl + 'CityMasterAdd';
  Edit = this.ApiUrl + 'CityMasterEdit';
  Del = this.ApiUrl + 'CityMasterDel';
  Active = this.ApiUrl + 'CityMasterActive';

  CityMasterGet() {
    // console.log('Service CityMaster is Running');
    return this.city.get(this.Get);
  }

  CityMasterAdd(formData: City) {
    // console.log('Sending the body to Api');
    return this.city.post(this.Add, formData);
  }

  CityMasterEdit(formData: City) {
    // console.log('Sending the body to Api');
    return this.city.put(this.Edit, formData);
  }

  CityMasterDel(formData: City) {
    // console.log('Sending the body to Api');
    return this.city.post(this.Del,formData);
  }

  CityMasterActive(formData: City) {
    // console.log('Sending the body to Api');
    return this.city.put(this.Active, formData);
  }

}
