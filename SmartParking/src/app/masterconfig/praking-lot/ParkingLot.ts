import { DecimalPipe } from '@angular/common';

export class ParkLot{
  public intAreaID :Number;
  public intCityID :Number;
  public intParkingLotID :Number;
  public strAreaName :string;
  public strCityName :string;
  public strParkingLotName:string;
  public decLatitude :DecimalPipe;
  public decLongitude :DecimalPipe;
  public strAddress:string;
  public dteModifiedOn :Date;
  public bActive :boolean;
  public bDeleted :boolean;
};

// {
  // "intParkingLotID": 80,
  // "strParkingLotName": "Opp SBI Bank",
  // "strAddress": "Opp SBI Bank",
  // "intAreaID": 38,
  // "strAreaName": "Patto123",
  // "intCityID": 1,
  // "strCityName": "Panaji",
  // "decLatitude": 15.496655,
  // "decLongitude": 73.833423,
  // "dteModifiedOn": "2022-06-03T17:44:46.951531",
  // "bActive": true,
  // "bDeleted": false
// }
