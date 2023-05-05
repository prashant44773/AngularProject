import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class DashboardService {
  
  constructor(private http: HttpClient) { }

  GetHourelyOccupancy() {
    return this.http.get('https://localhost:44385/api/Dashboard/GetHourlyOccupancy');
  }
  
}
