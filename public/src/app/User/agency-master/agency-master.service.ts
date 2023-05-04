import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Agent} from './Agency';


@Injectable({
  providedIn: 'root'
})
export class AgencyMasterService {

  constructor(private Agency: HttpClient) {}

  readonly ApiUrl = 'https://localhost:44385/api/AgencyMaster/';
  Get = this.ApiUrl + 'AgencyMasterGet';
  Add = this.ApiUrl + 'AgencyMasterAdd';
  Edit = this.ApiUrl + 'AgencyMasterEdit';
  Del = this.ApiUrl + 'AgencyMasterDel';
  Active = this.ApiUrl + 'AgencyMasterActive';
  LotNames = this.ApiUrl + 'GetLotNames';
  VehicleNames = this.ApiUrl + 'GetVehicleNames';

  AgencyMasterGet() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.Agency.get(this.Get);
  }

  AgencyMasterAdd(formData: Agent) {
    console.log('Sending the body to Api');
    return this.Agency.post(this.Add, formData);
  }

  AgencyMasterEdit(formData: Agent) {
    console.log(`The Object that we are Passing  : ${formData}`);
    console.log('Sending the body to Api Edit Method is Called');
    return this.Agency.put(this.Edit, formData);
  }

  AgencyMasterDel(formData: Agent) {
    console.log('Sending the body to Api');
    console.log('Sending the body to Api Del Method is Called');
    return this.Agency.post(this.Del,formData);
  }

  AgencyMasterActive(formData: Agent) {
    console.log('Sending the body to Api');
    console.log('Sending the body to Api Active Method is Called');
    return this.Agency.put(this.Active, formData);
  }

  GetLotNames() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.Agency.get(this.LotNames);
  }

  GetVehicleNames() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.Agency.get(this.VehicleNames);
  }
}
