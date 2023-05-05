import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ParkLot} from './ParkingLot'

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {

  constructor(private Lot: HttpClient) {}

  readonly ApiUrl = 'https://localhost:44385/api/ParkingLotMaster/';
  Get = this.ApiUrl + 'ParkingLotGet';
  Add = this.ApiUrl + 'ParkingLotAdd';
  Edit = this.ApiUrl + 'ParkingLotEdit';
  Del = this.ApiUrl + 'ParkingLotDel';
  Active = this.ApiUrl + 'ParkingLotActive';
  CityNames = 'https://localhost:44385/api/AreaMaster/AreaMasterGetCityNames';
  AreaByCity = 'https://localhost:44385/api/ParkingLotMaster/GetAreaNameByCity';

  ParkingLotMasterGet() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.Lot.get(this.Get);
  }

  ParkingLotMasterAdd(formData: ParkLot) {
    console.log('Sending the body to Api');
    return this.Lot.post(this.Add, formData);
  }

  ParkingLotMasterEdit(formData: ParkLot) {
    console.log(`The Object that we are Passing  : ${formData}`);
    console.log('Sending the body to Api Edit Method is Called');
    return this.Lot.put(this.Edit, formData);
  }

  ParkingLotMasterDel(formData: ParkLot) {
    console.log('Sending the body to Api');
    console.log('Sending the body to Api Del Method is Called');
    return this.Lot.post(this.Del,formData);
  }

  ParkingLotMasterActive(formData: ParkLot) {
    console.log('Sending the body to Api');
    console.log('Sending the body to Api Active Method is Called');
    return this.Lot.put(this.Active, formData);
  }

  GetCityName() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.Lot.get(this.CityNames);
  }

  GetAreaByCity() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.Lot.get(this.AreaByCity);
  }
}
