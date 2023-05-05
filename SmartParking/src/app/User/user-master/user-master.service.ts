import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './UserMaster';

@Injectable({
  providedIn: 'root'
})
export class UserMasterService {

  constructor(private user: HttpClient) {}

  readonly ApiUrl = 'https://localhost:44385/api/UserMaster/';
  Get = this.ApiUrl + 'UserMasterGet';
  Add = this.ApiUrl + 'UserMasterAdd';
  Edit = this.ApiUrl + 'UserMasterEdit';
  Del = this.ApiUrl + 'UserMasterDel';
  Active = this.ApiUrl + 'UserMasterActive';
  AgencyNames = this.ApiUrl + 'GetAgencyNames';
  UserTypeNames = this.ApiUrl + 'GetUserTypeNames';

  UserMasterGet() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.user.get(this.Get);
  }

  UserMasterAdd(formData: User) {
    console.log('Sending the body to Api');
    return this.user.post(this.Add, formData);
  }

  UserMasterEdit(formData: User) {
    console.log(`The Object that we are Passing  : ${formData}`);
    console.log('Sending the body to Api Edit Method is Called');
    return this.user.put(this.Edit, formData);
  }

  UserMasterDel(formData: User) {
    console.log('Sending the body to Api');
    console.log('Sending the body to Api Del Method is Called');
    return this.user.post(this.Del,formData);
  }

  UserMasterActive(formData: User) {
    console.log('Sending the body to Api');
    console.log('Sending the body to Api Active Method is Called');
    return this.user.put(this.Active, formData);
  }

  GetAgencyNames() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.user.get(this.AgencyNames);
  }

  GetUserTypeNames() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.user.get(this.UserTypeNames);
  }
}
