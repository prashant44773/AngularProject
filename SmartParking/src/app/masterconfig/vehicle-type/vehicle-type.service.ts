import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Vehicle} from './Vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  constructor(private VehicleType: HttpClient) {}

  readonly ApiUrl = 'https://localhost:44385/api/VehicleTypeMaster/';
  Get = this.ApiUrl + 'VehicleTypeGet';
  Add = this.ApiUrl + 'VehicleTypeAdd';
  Edit = this.ApiUrl + 'VehicleTypeEdit';
  Del = this.ApiUrl + 'VehicleTypeDel';
  Active = this.ApiUrl + 'VehicleTypeActive';


  VehicleTypeMasterGet() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.VehicleType.get(this.Get);
  }

  VehicleTypeMasterAdd(formData: Vehicle) {
    console.log('Sending the body to Api');
    return this.VehicleType.post(this.Add, formData);
  }

  VehicleTypeMasterEdit(formData: Vehicle) {
    console.log(`The Object that we are Passing  : ${formData}`);
    console.log('Sending the body to Api Edit Method is Called');
    return this.VehicleType.put(this.Edit, formData);
  }

  VehicleTypeMasterDel(formData: Vehicle) {
    console.log('Sending the body to Api');
    console.log('Sending the body to Api Del Method is Called');
    return this.VehicleType.post(this.Del,formData);
  }

  VehicleTypeMasterActive(formData: Vehicle) {
    console.log('Sending the body to Api');
    console.log('Sending the body to Api Active Method is Called');
    return this.VehicleType.put(this.Active, formData);
  }

}
