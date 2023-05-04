import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SENSOR } from './sensormodel';
@Injectable()
export class SensorService {
  readonly rootUrl = 'https://localhost:44385/api/SensorMaster/';
  constructor(private http: HttpClient) { }

  GetSen() {
    return this.http.get(this.rootUrl + 'Get');
  }  
  SenUpdate(SENdata: SENSOR){
    const body: SENSOR ={
      
      intDevEUI: SENdata.intDevEUI,
      p_check: SENdata.p_check,
      intParkingLotID: SENdata.intParkingLotID,
      strParkingLotName: SENdata.strParkingLotName,
      intSensorParkingSlot: SENdata.intSensorParkingSlot,
      strSlotName: SENdata.strSlotName,
      intVehicleTypeID: SENdata.intVehicleTypeID,
      strDevEUI: SENdata.strDevEUI,
      strDeviceName: SENdata.strDeviceName,
      intApplicationID: SENdata.intApplicationID,
      strApplicationName: SENdata.strApplicationName,
      plotNo: SENdata.plotNo,
      agencyname: SENdata.agencyname,
      intAgencyID: SENdata.intAgencyID,
      strVehicleType: SENdata.strVehicleType,
      intGatewayMasterID: SENdata.intGatewayMasterID,
      strGatewayID: SENdata.strGatewayID,
      intPISMasterID: SENdata.intPISMasterID,
      strPISDeviceID: SENdata.strPISDeviceID,
      bDisconnected: SENdata.bDisconnected,
      bDeactivated: SENdata.bDeactivated,
      decLatitude: SENdata.decLatitude,
      decLongitude: SENdata.decLongitude,
      strPISMasterNames: SENdata.strPISMasterNames,
      strpismasterid: SENdata.strpismasterid,
      strpisdetails: SENdata.strpisdetails

    }
    return this.http.post(this.rootUrl + 'Edit', body);

  }

  SenStatus(SENdata: SENSOR){
    const body: SENSOR ={
      
      intDevEUI: SENdata.intDevEUI,
      p_check: SENdata.p_check,
      intParkingLotID: SENdata.intParkingLotID,
      strParkingLotName: SENdata.strParkingLotName,
      intSensorParkingSlot: SENdata.intSensorParkingSlot,
      strSlotName: SENdata.strSlotName,
      intVehicleTypeID: SENdata.intVehicleTypeID,
      strDevEUI: SENdata.strDevEUI,
      strDeviceName: SENdata.strDeviceName,
      intApplicationID: SENdata.intApplicationID,
      strApplicationName: SENdata.strApplicationName,
      plotNo: SENdata.plotNo,
      agencyname: SENdata.agencyname,
      intAgencyID: SENdata.intAgencyID,
      strVehicleType: SENdata.strVehicleType,
      intGatewayMasterID: SENdata.intGatewayMasterID,
      strGatewayID: SENdata.strGatewayID,
      intPISMasterID: SENdata.intPISMasterID,
      strPISDeviceID: SENdata.strPISDeviceID,
      bDisconnected: SENdata.bDisconnected,
      bDeactivated: SENdata.bDeactivated,
      decLatitude: SENdata.decLatitude,
      decLongitude: SENdata.decLongitude,
      strPISMasterNames: SENdata.strPISMasterNames,
      strpismasterid: SENdata.strpismasterid,
      strpisdetails: SENdata.strpisdetails

    }
    return this.http.post(this.rootUrl + 'Activate', body);

  }
  GetLotIDAndName(){
    return this.http.get('https://localhost:44385/api/PISMaster/GetLot');
  }
  GetPISData(){
    return this.http.get('https://localhost:44385/api/SensorMaster/GetPISData');
  }
}
