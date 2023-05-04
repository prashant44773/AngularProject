import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserTy} from './UserType'

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  constructor(private usertype: HttpClient) {}

  readonly ApiUrl = 'https://localhost:44385/api/UserTypeMaster/';
  Get = this.ApiUrl + 'UserTypeGet';
  Add = this.ApiUrl + 'UserTypeAdd';
  Edit = this.ApiUrl + 'UserTypeEdit';
  Del = this.ApiUrl + 'UserTypeDel';
  Active = this.ApiUrl + 'UserTypeActive';
  AgencyNames = this.ApiUrl + 'GetAgencyNames';
  UserTypeNames = this.ApiUrl + 'GetUserTypeNames';

  UserTypeMasterGet() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.usertype.get(this.Get);
  }

  UserTypeMasterAdd(formData: UserTy) {
    console.log('Sending the body to Api');
    return this.usertype.post(this.Add, formData);
  }

  UserTypeMasterEdit(formData: UserTy) {
    console.log(`The Object that we are Passing  : ${formData}`);
    console.log('Sending the body to Api Edit Method is Called');
    return this.usertype.put(this.Edit, formData);
  }

  UserTypeMasterDel(formData: UserTy) {
    console.log('Sending the body to Api');
    console.log('Sending the body to Api Del Method is Called');
    return this.usertype.post(this.Del,formData);
  }

  UserTypeMasterActive(formData: UserTy) {
    console.log('Sending the body to Api');
    console.log('Sending the body to Api Active Method is Called');
    return this.usertype.put(this.Active, formData);
  }

  GetAgencyNames() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.usertype.get(this.AgencyNames);
  }

  GetUserTypeNames() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.usertype.get(this.UserTypeNames);
  }
}
