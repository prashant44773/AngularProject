import { DecimalPipe } from '@angular/common';

export class Area{
      public intAreaID :Number;
      public strAreaName :string;
      public intCityID :Number;
      public strCityName :string;
      public decLatitude :DecimalPipe;
      public decLongitude :DecimalPipe;
      public dteModifiedOn :Date;
      public bActive :boolean;
      public bDeleted :boolean;
      public intUserID :Number;
      public strUserName:string;
      public strRemarks:string;
};


// "intAreaID": 38,
        // "strAreaName": "Patto",
        // "strAddress": "EDC Patto Pay Parking",
        // "intCityID": 1,
        // "strCityName": "Panaji",
        // "decLatitude": 15.4956,
        // "decLongitude": 73.8344,
        // "dteModifiedOn": "2023-04-18T15:51:58.287288",
        // "bActive": true,
        // "bDeleted": false,
        // "intUserID": 77,
        // "strUserName": "Panaji",
        // "strRemarks": "Patto"
