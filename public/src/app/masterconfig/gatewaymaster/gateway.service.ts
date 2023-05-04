import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GATEWAY } from './gatewaymodel';
@Injectable()
export class GatewayService {
  readonly rootUrl = 'https://localhost:44385/api/GateWay/';
  constructor(private http: HttpClient) { }

  GetGateway() {
    return this.http.get(this.rootUrl + 'Get');
  }
  GatewayUpdate(GatewayData:GATEWAY){
    const body: GATEWAY = {
      intGatewayMasterID: GatewayData.intGatewayMasterID,
      strName: GatewayData.strName,
      strGatewayName: GatewayData.strGatewayName,
      intGateWaySeqID: GatewayData.intGateWaySeqID,
      strGatewayID: GatewayData.strGatewayID,
      dteCreatedOn: GatewayData.dteCreatedOn,
      bDisconnected: GatewayData.bDisconnected,
      strParkingLotNames: GatewayData.strParkingLotNames,
      strParkingLotName: GatewayData.strParkingLotName,
      ParkingLots: GatewayData.ParkingLots,
      ParkingLot: GatewayData.ParkingLot,
      strLocationName: GatewayData.strLocationName,
    }
    return this.http.post(this.rootUrl + 'Edit', body);

  }
  GatewayStatus(GatewayData:GATEWAY){
    const body: GATEWAY = {
      intGatewayMasterID: GatewayData.intGatewayMasterID,
      strName: GatewayData.strName,
      strGatewayName: GatewayData.strGatewayName,
      intGateWaySeqID: GatewayData.intGateWaySeqID,
      strGatewayID: GatewayData.strGatewayID,
      dteCreatedOn: GatewayData.dteCreatedOn,
      bDisconnected: GatewayData.bDisconnected,
      strParkingLotNames: GatewayData.strParkingLotNames,
      strParkingLotName: GatewayData.strParkingLotName,
      ParkingLots: GatewayData.ParkingLots,
      ParkingLot: GatewayData.ParkingLot,
      strLocationName: GatewayData.strLocationName,
    }
    return this.http.post(this.rootUrl + 'Activate', body);
  }
  
  GetLotIDAndName(){
    return this.http.get('https://localhost:44385/api/PISMaster/GetLot');
  }
  
}
