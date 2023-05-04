import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PrintpassService {
  
  constructor(private http: HttpClient) { }

  GetPassData(OwnerID) {
    const body = {
      "PassID":OwnerID
    }
    return this.http.post('https://localhost:44385/api/OwnerMasterPassDetails/GetPassDetails',body);
  }
}
