import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PASS } from './passdetailsmodel';



@Injectable()
export class PassdetailsService {
  readonly rootUrl = 'https://localhost:44385/api/OwnerMasterPassDetails/';
  constructor(private http: HttpClient) { }

  GetPassData() {
    return this.http.get(this.rootUrl + 'Get');
  }

  PassDataUpdate(PassData: PASS){
    const body: PASS = {
      intPassID: PassData.intPassID,
      strOwnerName: PassData.strOwnerName,
      strOwnerAddress: PassData.strOwnerAddress,
      strOwnerMobileNo: PassData.strOwnerMobileNo,
      strVehicleregNo: PassData.strVehicleregNo,
      strvehicleMakeModel: PassData.strvehicleMakeModel,
      intVehicletype: PassData.intVehicletype,
      strVehicleType_name: PassData.strVehicleType_name,
      dtepassvalidfrom: PassData.dtepassvalidfrom,
      dtepassvalidTo: PassData.dtepassvalidTo,
      strpassvalidity: PassData.strpassvalidity,
      intParkingArea: PassData.intParkingArea,
      strParkingArea: PassData.strParkingArea,
      decTotalpayableAmount: PassData.decTotalpayableAmount,
      PassIssuedatetime: PassData.PassIssuedatetime,
      LastUpdateddatetime: PassData.LastUpdateddatetime,
      Status: PassData.Status,
      passNo: PassData.passNo
    }
    return this.http.post(this.rootUrl + 'Edit', body);
  }

  PassDataDelete(PassData: PASS){
    const body: PASS = {
      intPassID: PassData.intPassID,
      strOwnerName: PassData.strOwnerName,
      strOwnerAddress: PassData.strOwnerAddress,
      strOwnerMobileNo: PassData.strOwnerMobileNo,
      strVehicleregNo: PassData.strVehicleregNo,
      strvehicleMakeModel: PassData.strvehicleMakeModel,
      intVehicletype: PassData.intVehicletype,
      strVehicleType_name: PassData.strVehicleType_name,
      dtepassvalidfrom: PassData.dtepassvalidfrom,
      dtepassvalidTo: PassData.dtepassvalidTo,
      strpassvalidity: PassData.strpassvalidity,
      intParkingArea: PassData.intParkingArea,
      strParkingArea: PassData.strParkingArea,
      decTotalpayableAmount: PassData.decTotalpayableAmount,
      PassIssuedatetime: PassData.PassIssuedatetime,
      LastUpdateddatetime: PassData.LastUpdateddatetime,
      Status: PassData.Status,
      passNo: PassData.passNo
    }
    return this.http.post(this.rootUrl + 'Delete', body);
  }
  PassDataStatus(PassData: PASS){
    const body: PASS = {
      intPassID: PassData.intPassID,
      strOwnerName: PassData.strOwnerName,
      strOwnerAddress: PassData.strOwnerAddress,
      strOwnerMobileNo: PassData.strOwnerMobileNo,
      strVehicleregNo: PassData.strVehicleregNo,
      strvehicleMakeModel: PassData.strvehicleMakeModel,
      intVehicletype: PassData.intVehicletype,
      strVehicleType_name: PassData.strVehicleType_name,
      dtepassvalidfrom: PassData.dtepassvalidfrom,
      dtepassvalidTo: PassData.dtepassvalidTo,
      strpassvalidity: PassData.strpassvalidity,
      intParkingArea: PassData.intParkingArea,
      strParkingArea: PassData.strParkingArea,
      decTotalpayableAmount: PassData.decTotalpayableAmount,
      PassIssuedatetime: PassData.PassIssuedatetime,
      LastUpdateddatetime: PassData.LastUpdateddatetime,
      Status: PassData.Status,
      passNo: PassData.passNo
    }
    return this.http.post(this.rootUrl + 'Activate', body);
  }
}
