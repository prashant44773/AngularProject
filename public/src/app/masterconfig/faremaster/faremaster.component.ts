import { Component } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { FormGroup, FormControl } from '@angular/forms';
import { FareService } from './fare.service'
import { AddEvent, CancelEvent, EditEvent, RemoveEvent, SaveEvent, GridComponent } from '@progress/kendo-angular-grid';
import { FARE } from './faremodel';
import { divIcon } from '@progress/kendo-svg-icons';
@Component({
  selector: 'app-faremaster',
  templateUrl: './faremaster.component.html',
  styleUrls: ['./faremaster.component.css']
})
export class FaremasterComponent {
  public formGroup: FormGroup;
  private editedRowIndex: number;
  public gridData: any;
  
  //For Vehicle Type DropDown
  public selectedTypeGlobal: { vehicleTypeID: number; vehicleType: string };

  //For Area And Lot DropDown
  public isDisabledLot = true;
  public selectedAreaGlobal: { AreaID: number ; AreaName: string };
  public selectedLotGlobal: { LotID: number ; LotName: string };

  constructor(private getFare: FareService) {
    this.getFare.GetFare()
      .subscribe(data => {
        console.log(data)
        this.gridData = [data].pop();
      })
  }


  public onStateChange(): void {
    this.getFare.GetFare()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({
      intFareMatrixID: new FormControl(),
      intFromValue: new FormControl(),
      intToValue: new FormControl(),
      intVehicleTypeID: new FormControl(),
      strVehicleType: new FormControl(),
      intFare: new FormControl(),
      dteModifiedOn: new FormControl(),
      bActive: new FormControl(),
      bDeleted: new FormControl(),
      intParkingLotID: new FormControl(),
      strParkingLotName: new FormControl(),
      intAreaID: new FormControl(),
      strAreaName: new FormControl(),
      strHourlyFareName: new FormControl(),
      
    });

    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }
  public editHandler(args: EditEvent): void {
    const { dataItem } = args;
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      intFareMatrixID: new FormControl(dataItem.intFareMatrixID),
      intFromValue: new FormControl(dataItem.intFromValue),
      intToValue: new FormControl(dataItem.intToValue),
      intVehicleTypeID: new FormControl(dataItem.intVehicleTypeID),
      strVehicleType: new FormControl(dataItem.strVehicleType),
      intFare: new FormControl(dataItem.intFare),
      dteModifiedOn: new FormControl(dataItem.dteModifiedOn),
      bActive: new FormControl(dataItem.bActive),
      bDeleted: new FormControl(dataItem.bDeleted),
      intParkingLotID: new FormControl(dataItem.intParkingLotID),
      strParkingLotName: new FormControl(dataItem.strParkingLotName),
      intAreaID: new FormControl(dataItem.intAreaID),
      strAreaName: new FormControl(dataItem.strAreaName),
      strHourlyFareName: new FormControl(dataItem.strHourlyFareName),
      
    });
    
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    this.closeEditor(args.sender, args.rowIndex);
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const devicedata: FARE = formGroup.value;
    console.log(devicedata);
    if (devicedata.intFareMatrixID == null) {
      devicedata.intFareMatrixID = 0;
      devicedata.bActive = true;
      devicedata.bDeleted = false;
      devicedata.dteModifiedOn = '2022-05-14T12:47:34.009985';      
    }
    devicedata.strVehicleType = this.selectedTypeGlobal.vehicleType;
    devicedata.intVehicleTypeID = this.selectedTypeGlobal.vehicleTypeID ;

    devicedata.intAreaID = this.selectedAreaGlobal.AreaID;
    devicedata.strAreaName = this.selectedAreaGlobal.AreaName;

    devicedata.intParkingLotID = this.selectedLotGlobal.LotID;
    devicedata.strParkingLotName = this.selectedLotGlobal.LotName;
    console.log(devicedata);
    console.log(devicedata);
    this.getFare.FareUpdate(devicedata)
      .subscribe((data: any) => {
        const re = data;
        this.onStateChange();
      },
        (error: any) => {
          console.log(error.error.message);
        }
      );
    sender.closeRow(rowIndex);
  }
  public removeHandler(args: RemoveEvent): void {

    this.getFare.FareDalete(args.dataItem)
      .subscribe((data: any) => {
        const re = data;
        this.onStateChange();
      },
        (error: any) => {
          console.log(error.error.message);
        }
      );

  }
  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    // close the editor
    grid.closeRow(rowIndex);
    // reset the helpers
    this.editedRowIndex = 0;
    this.formGroup;
  }
  public ActivateDeActivate(dataItem) {
    
    this.getFare.FareStatus(dataItem)
      .subscribe((data: any) => {
        const re = data;
        this.onStateChange();
      },
        (error: any) => {
          console.log(error.error.message);
        }
      );
  }


  //DropDowns
  public defaultVehicleType: { vehicleTypeID: number | null; vehicleType: string } = {
    vehicleTypeID: null,
    vehicleType: 'Select Vehicle Type',
  };

  public dataVehicle: Array<{ vehicleTypeID: number; vehicleType: string }> = [
    { vehicleTypeID: 1 , vehicleType: '2 Wheeler'  },
    { vehicleTypeID: 3 , vehicleType: '4 Wheeler' },
  ];
  public selectedType: { vehicleTypeID: number; vehicleType: string };

  handleCategoryChange(value) {
    this.selectedType = value;
    this.selectedTypeGlobal = value;
  }

  //Cascade Dropdown For Area And Lot
  public defaultArea: { AreaID: number | null; AreaName: string } = {
    AreaID: null,
    AreaName: 'Select Area',
  };

  public defaultLot: { LotID: number | null; LotName: string } = {
    LotID: null,
    LotName: 'Select Lot',
  };

  public dataArea: Array<{ AreaID: number ; AreaName: string }> = [
    { AreaID: 38 , AreaName: 'Patto'  },
    { AreaID: 42 , AreaName: 'Passport'  },    
  ];
  public dataLot: Array<{ LotID: number ; LotName: string ; AreaID: number }> = [
    { LotID: 81 , LotName: 'Opp City Centre', AreaID:38  },
    { LotID: 82 , LotName: 'Opp Dempo Tower', AreaID:38  },
    { LotID: 85 , LotName: 'Opp Passport_01', AreaID:42  },
    { LotID: 92 , LotName: 'Opp Passport_02', AreaID:42  },
  ];

  public dataResultLot: Array<{ LotID: number ; LotName: string ; AreaID: number }>;

  public selectedArea: { AreaID: number ; AreaName: string };
  public selectedLot: { LotID: number ; LotName: string };

  handleAreaChange(value) {
    this.selectedType = value;
    this.selectedAreaGlobal = value;

    if (value.categoryId === this.defaultArea.AreaID) {
      this.isDisabledLot = true;
      this.dataResultLot = [];
    } else {
      this.isDisabledLot = false;
      this.dataResultLot = this.dataLot.filter(
        (s) => s.AreaID === value.AreaID
      );
    }
  }

  handleLotChange(value) {
    console.log(value);
    this.selectedLotGlobal = value;
  }


}
