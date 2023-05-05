import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FARE } from './faremodel';
import { retry } from 'rxjs/operators';

@Injectable()
export class FareService {
  readonly rootUrl = 'https://localhost:44385/api/FareMatrix/';
  constructor(private http: HttpClient) { }
  GetFare(){
    return this.http.get(this.rootUrl + 'Get');
  }
  FareUpdate(Faredata: FARE){
    const body: FARE = {
      intFareMatrixID: Faredata.intFareMatrixID,
      intFromValue: Faredata.intFromValue,
      intToValue: Faredata.intToValue,
      intVehicleTypeID: Faredata.intVehicleTypeID,
      strVehicleType: Faredata.strVehicleType,
      intFare: Faredata.intFare,
      dteModifiedOn: Faredata.dteModifiedOn,
      bActive: Faredata.bActive,
      bDeleted: Faredata.bDeleted,
      intParkingLotID: Faredata.intParkingLotID,
      strParkingLotName: Faredata.strParkingLotName,
      intAreaID: Faredata.intAreaID,
      strAreaName: Faredata.strAreaName,
      strHourlyFareName: Faredata.strHourlyFareName
    }
    return this.http.post(this.rootUrl + 'Edit', body);
  }

  FareDalete(Faredata: FARE){
    const body: FARE = {
      intFareMatrixID: Faredata.intFareMatrixID,
      intFromValue: Faredata.intFromValue,
      intToValue: Faredata.intToValue,
      intVehicleTypeID: Faredata.intVehicleTypeID,
      strVehicleType: Faredata.strVehicleType,
      intFare: Faredata.intFare,
      dteModifiedOn: Faredata.dteModifiedOn,
      bActive: Faredata.bActive,
      bDeleted: Faredata.bDeleted,
      intParkingLotID: Faredata.intParkingLotID,
      strParkingLotName: Faredata.strParkingLotName,
      intAreaID: Faredata.intAreaID,
      strAreaName: Faredata.strAreaName,
      strHourlyFareName: Faredata.strHourlyFareName
    }
    return this.http.post(this.rootUrl + 'Delete', body);
  }
  FareStatus(Faredata: FARE){
    const body: FARE = {
      intFareMatrixID: Faredata.intFareMatrixID,
      intFromValue: Faredata.intFromValue,
      intToValue: Faredata.intToValue,
      intVehicleTypeID: Faredata.intVehicleTypeID,
      strVehicleType: Faredata.strVehicleType,
      intFare: Faredata.intFare,
      dteModifiedOn: Faredata.dteModifiedOn,
      bActive: Faredata.bActive,
      bDeleted: Faredata.bDeleted,
      intParkingLotID: Faredata.intParkingLotID,
      strParkingLotName: Faredata.strParkingLotName,
      intAreaID: Faredata.intAreaID,
      strAreaName: Faredata.strAreaName,
      strHourlyFareName: Faredata.strHourlyFareName
    }
    return this.http.post(this.rootUrl + 'Activate', body);
  }
}
