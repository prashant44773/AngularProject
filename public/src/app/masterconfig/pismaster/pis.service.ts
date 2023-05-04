import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PIS } from './pismodel';

@Injectable()
export class PisService {
  readonly rootUrl = 'https://localhost:44385/api/PISMaster/';
  constructor(private http: HttpClient) { }

  GetPis() {
    return this.http.get(this.rootUrl + 'Get');
  }

  PISUpdate(PISdata: PIS) {
    const body: PIS = {
      intPISMasterID: PISdata.intPISMasterID,
      strPISDeviceID: PISdata.strPISDeviceID,
      strPISDeviceIMEI: PISdata.strPISDeviceIMEI,
      strPISDeviceMake: PISdata.strPISDeviceMake,
      strPISDeviceModel: PISdata.strPISDeviceModel,
      intPISSeqID: PISdata.intPISSeqID,
      intParkingLotID: PISdata.intParkingLotID,
      strRemarks: PISdata.strRemarks,
      dteWarrantyStartDate: PISdata.dteWarrantyStartDate,
      dteWarrantyEndDate: PISdata.dteWarrantyEndDate,
      strParkingLotNames: PISdata.strParkingLotNames,
      ParkingLot: PISdata.ParkingLot,
      strWarrantyStartDate: PISdata.strWarrantyStartDate,
      strWarrantyEndDate: PISdata.strWarrantyEndDate,
      ParkingLots: PISdata.ParkingLots,
      strPISDeviceSimNumber: PISdata.strPISDeviceSimNumber,
      dteModifiedOn: PISdata.dteModifiedOn,
      bActive: PISdata.bActive,
      bDeleted: PISdata.bDeleted
    }
    return this.http.post(this.rootUrl + 'Edit', body);
  }
  
  PISDelete(PISdata: PIS) {
    const body: PIS = {
      intPISMasterID: PISdata.intPISMasterID,
      strPISDeviceID: PISdata.strPISDeviceID,
      strPISDeviceIMEI: PISdata.strPISDeviceIMEI,
      strPISDeviceMake: PISdata.strPISDeviceMake,
      strPISDeviceModel: PISdata.strPISDeviceModel,
      intPISSeqID: PISdata.intPISSeqID,
      intParkingLotID: PISdata.intParkingLotID,
      strRemarks: PISdata.strRemarks,
      dteWarrantyStartDate: PISdata.dteWarrantyStartDate,
      dteWarrantyEndDate: PISdata.dteWarrantyEndDate,
      strParkingLotNames: PISdata.strParkingLotNames,
      ParkingLot: PISdata.ParkingLot,
      strWarrantyStartDate: PISdata.strWarrantyStartDate,
      strWarrantyEndDate: PISdata.strWarrantyEndDate,
      ParkingLots: PISdata.ParkingLots,
      strPISDeviceSimNumber: PISdata.strPISDeviceSimNumber,
      dteModifiedOn: PISdata.dteModifiedOn,
      bActive: PISdata.bActive,
      bDeleted: PISdata.bDeleted
    }
    return this.http.post(this.rootUrl + 'Delete', body);
  }
    
  PISStatus(PISdata: PIS) {
    const body: PIS = {
      intPISMasterID: PISdata.intPISMasterID,
      strPISDeviceID: PISdata.strPISDeviceID,
      strPISDeviceIMEI: PISdata.strPISDeviceIMEI,
      strPISDeviceMake: PISdata.strPISDeviceMake,
      strPISDeviceModel: PISdata.strPISDeviceModel,
      intPISSeqID: PISdata.intPISSeqID,
      intParkingLotID: PISdata.intParkingLotID,
      strRemarks: PISdata.strRemarks,
      dteWarrantyStartDate: PISdata.dteWarrantyStartDate,
      dteWarrantyEndDate: PISdata.dteWarrantyEndDate,
      strParkingLotNames: PISdata.strParkingLotNames,
      ParkingLot: PISdata.ParkingLot,
      strWarrantyStartDate: PISdata.strWarrantyStartDate,
      strWarrantyEndDate: PISdata.strWarrantyEndDate,
      ParkingLots: PISdata.ParkingLots,
      strPISDeviceSimNumber: PISdata.strPISDeviceSimNumber,
      dteModifiedOn: PISdata.dteModifiedOn,
      bActive: PISdata.bActive,
      bDeleted: PISdata.bDeleted
    }
    return this.http.post(this.rootUrl + 'Activate', body);
  }
  GetLotIDAndName(){
    return this.http.get(this.rootUrl + 'GetLot');
  }

}
