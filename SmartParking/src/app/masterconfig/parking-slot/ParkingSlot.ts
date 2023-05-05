import { DecimalPipe } from '@angular/common';

export class ParkingSlot{
  public intParkingSlotID :Number;
  public intParkingLotID :Number;
  public strParkingLotName:string;
  public intVehicleTypeID :Number;
  public intTotalSlots :Number;
  public strVehicleType :string;
  public dteModifiedOn :Date;
  public bActive :boolean;
  public bDeleted :boolean;
};

{
  // "intParkingSlotID": 87,
  // "intParkingLotID": 80,
  // "strParkingLotName": "Opp SBI Bank Hello World",
  // "intVehicleTypeID": 3,
  // "intTotalSlots": 90,
  // "strVehicleType": "4 Wheeler",
  // "dteModifiedOn": "2023-04-28T14:07:22.382674",
  // "bActive": true,
  // "bDeleted": false
}
