import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ETM } from './model';
import { tap, map } from 'rxjs/operators';



export class deService extends BehaviorSubject<any[]>{
  public loading: boolean;

  private BASE_URL = 'https://localhost:44385/api/DeviceMaster/Master';

  constructor(private http: HttpClient) {
    super([]);
  }

  public query(): void {
    this.fetch().subscribe((x: any) => super.next(x));
  }

  protected fetch(): Observable<ETM[]> {
    debugger;

    this.loading = true;
    var data = this.http.get(`${this.BASE_URL}`);
    return this.http.get(`${this.BASE_URL}`).pipe(
      map((res: any) => <ETM[]>res['value']),
    );
  }
}

// @Injectable()
// export class DeviceService extends deService{
//   constructor(http: HttpClient){
//     super(http);
//   }
// }

@Injectable()
export class DeviceService {
  readonly rootUrl = 'https://localhost:44385/api/DeviceMaster/';
  constructor(private http: HttpClient) { }

  registerDev() {
    return this.http.get(this.rootUrl + 'Get');
  }

  DeviceUpdate(devicedata: ETM) {
    const body: ETM = {
      intDeviceID: devicedata.intDeviceID,
      strDeviceNo: devicedata.strDeviceNo,
      strDeviceModel: devicedata.strDeviceModel,
      strDeviceToken: devicedata.strDeviceToken,
      intParkingLotID: devicedata.intParkingLotID,
      strParkingLotName: devicedata.strParkingLotName,
      strETMSimNumber: devicedata.strETMSimNumber,
      dteETMDeviceWarrantyStartDate: devicedata.dteETMDeviceWarrantyStartDate,
      strETMDeviceWarrantyStartDate: devicedata.strETMDeviceWarrantyStartDate,
      strETMDeviceWarrantyEndDate: devicedata.strETMDeviceWarrantyEndDate,
      dteETMDeviceWarrantyEndDate: devicedata.dteETMDeviceWarrantyEndDate,
      strRemarks: devicedata.strRemarks,
      dteModified: devicedata.dteModified,
      bActive: devicedata.bActive,
      bDeleted: devicedata.bDeleted,
    }
    return this.http.post(this.rootUrl + 'Edit', body);
  }
  
  DeviceDelete(devicedata: ETM) {
    const body: ETM = {
      intDeviceID: devicedata.intDeviceID,
      strDeviceNo: devicedata.strDeviceNo,
      strDeviceModel: devicedata.strDeviceModel,
      strDeviceToken: devicedata.strDeviceToken,
      intParkingLotID: devicedata.intParkingLotID,
      strParkingLotName: devicedata.strParkingLotName,
      strETMSimNumber: devicedata.strETMSimNumber,
      dteETMDeviceWarrantyStartDate: devicedata.dteETMDeviceWarrantyStartDate,
      strETMDeviceWarrantyStartDate: devicedata.strETMDeviceWarrantyStartDate,
      strETMDeviceWarrantyEndDate: devicedata.strETMDeviceWarrantyEndDate,
      dteETMDeviceWarrantyEndDate: devicedata.dteETMDeviceWarrantyEndDate,
      strRemarks: devicedata.strRemarks,
      dteModified: devicedata.dteModified,
      bActive: devicedata.bActive,
      bDeleted: devicedata.bDeleted,
    }
    return this.http.post(this.rootUrl + 'Delete', body);
  }

    
  DeviceStatus(devicedata: ETM) {
    const body: ETM = {
      intDeviceID: devicedata.intDeviceID,
      strDeviceNo: devicedata.strDeviceNo,
      strDeviceModel: devicedata.strDeviceModel,
      strDeviceToken: devicedata.strDeviceToken,
      intParkingLotID: devicedata.intParkingLotID,
      strParkingLotName: devicedata.strParkingLotName,
      strETMSimNumber: devicedata.strETMSimNumber,
      dteETMDeviceWarrantyStartDate: devicedata.dteETMDeviceWarrantyStartDate,
      strETMDeviceWarrantyStartDate: devicedata.strETMDeviceWarrantyStartDate,
      strETMDeviceWarrantyEndDate: devicedata.strETMDeviceWarrantyEndDate,
      dteETMDeviceWarrantyEndDate: devicedata.dteETMDeviceWarrantyEndDate,
      strRemarks: devicedata.strRemarks,
      dteModified: devicedata.dteModified,
      bActive: devicedata.bActive,
      bDeleted: devicedata.bDeleted,
    }
    return this.http.post(this.rootUrl + 'Activate', body);
  }


}
