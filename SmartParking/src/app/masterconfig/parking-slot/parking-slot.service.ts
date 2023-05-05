import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ParkingSlot} from './ParkingSlot';

@Injectable({
  providedIn: 'root'
})
export class ParkingSlotService {

  constructor(private Slot: HttpClient) {}

  readonly ApiUrl = 'https://localhost:44385/api/ParkingSlotMaster/';
  Get = this.ApiUrl + 'ParkingSlotGet';
  Add = this.ApiUrl + 'ParkingSlotAdd';
  Edit = this.ApiUrl + 'ParkingSlotEdit';
  Del = this.ApiUrl + 'ParkingSlotDel';
  Active = this.ApiUrl + 'ParkingSlotActive';
  LotNames = this.ApiUrl + 'GetLotNames';
  VehicleNames = this.ApiUrl + 'GetVehicleNames';

  ParkingSlotMasterGet() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.Slot.get(this.Get);
  }

  ParkingSlotMasterAdd(formData: ParkingSlot) {
    console.log('Sending the body to Api');
    return this.Slot.post(this.Add, formData);
  }

  ParkingSlotMasterEdit(formData: ParkingSlot) {
    console.log(`The Object that we are Passing  : ${formData}`);
    console.log('Sending the body to Api Edit Method is Called');
    return this.Slot.put(this.Edit, formData);
  }

  ParkingSlotMasterDel(formData: ParkingSlot) {
    console.log('Sending the body to Api');
    console.log('Sending the body to Api Del Method is Called');
    return this.Slot.post(this.Del,formData);
  }

  ParkingSlotMasterActive(formData: ParkingSlot) {
    console.log('Sending the body to Api');
    console.log('Sending the body to Api Active Method is Called');
    return this.Slot.put(this.Active, formData);
  }

  GetLotNames() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.Slot.get(this.LotNames);
  }

  GetVehicleNames() {
    console.log('Service AreaMaster is Running Get Method is Called');
    return this.Slot.get(this.VehicleNames);
  }
}
