import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SETTING } from './settingmodel'

@Injectable()
export class SettingService {

  readonly rootUrl = 'https://localhost:44385/api/SettingMaster/';
  constructor(private http: HttpClient) { }
  GetService(){
    return this.http.get(this.rootUrl + 'Get');
  }


  SettingUpdate(SettingData: SETTING){
    const body: SETTING = {
      
      
      intSettingID: SettingData.intSettingID,
      strSettingKey: SettingData.strSettingKey,
      strSettingValue: SettingData.strSettingValue,
      strDescription: SettingData.strDescription,
      bActive: SettingData.bActive,
      
    }
    return this.http.post(this.rootUrl + 'Edit', body);
  }

  SettingDelete(SettingData: SETTING){
    const body: SETTING = {
      intSettingID: SettingData.intSettingID,
      strSettingKey: SettingData.strSettingKey,
      strSettingValue: SettingData.strSettingValue,
      strDescription: SettingData.strDescription,
      bActive: SettingData.bActive,
    }
    return this.http.post(this.rootUrl + 'Delete', body);
  }
  SettingStatus(SettingData: SETTING){
    const body: SETTING = {
      intSettingID: SettingData.intSettingID,
      strSettingKey: SettingData.strSettingKey,
      strSettingValue: SettingData.strSettingValue,
      strDescription: SettingData.strDescription,
      bActive: SettingData.bActive,
    }
    return this.http.post(this.rootUrl + 'Activate', body);
  }

}
