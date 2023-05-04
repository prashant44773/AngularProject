import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OPERATIONS } from './operationsModel';

@Injectable()
export class OperationsService {
  readonly rootUrl = 'https://localhost:44385/api/OpearationalDashboard/';
  constructor(private http: HttpClient) { }

  GetArea(DateStr:String) {
    const body: OPERATIONS = {
      Date1:DateStr,
      intAreaID:0
    }
    return this.http.post(this.rootUrl + 'MultipleArea',body);
  }
  
  GetParking(areaID: Number, DateStr: any) {
    
    const body: OPERATIONS = {
      Date1:DateStr,
      intAreaID:areaID
    }
    return this.http.post(this.rootUrl + 'MultipleParking',body);
  }



}
