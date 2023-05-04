import { Component } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { SENSOR } from './sensormodel'

import { SensorService } from './sensor.service';

import { FormGroup, FormControl } from '@angular/forms';
import { AddEvent, CancelEvent, EditEvent, RemoveEvent, SaveEvent, GridComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-sensormaster',
  templateUrl: './sensormaster.component.html',
  styleUrls: ['./sensormaster.component.css']
})
export class SensormasterComponent {
  public formGroup: FormGroup;
  private editedRowIndex: number;
  public gridData: any;

  public LotList: any = [];
  public selectedLotGlobal: { intParkingLotID: number; strParkingLotName: string };
  public selectedTypeGlobal: { vehicleTypeID: number; vehicleType: string };



  constructor(private getSensor: SensorService) {
    this.getSensor.GetSen()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
    this.getSensor.GetLotIDAndName()
      .subscribe(data => {
        this.LotList = data;
      })
  }

  public onStateChange(): void {
    this.getSensor.GetSen()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({

      intDevEUI: new FormControl(),
      p_check: new FormControl(),
      intParkingLotID: new FormControl(),
      strParkingLotName: new FormControl(),
      intSensorParkingSlot: new FormControl(),
      strSlotName: new FormControl(),
      intVehicleTypeID: new FormControl(),
      strDevEUI: new FormControl(),
      strDeviceName: new FormControl(),
      intApplicationID: new FormControl(),
      strApplicationName: new FormControl(),
      plotNo: new FormControl(),
      agencyname: new FormControl(),
      intAgencyID: new FormControl(),
      strVehicleType: new FormControl(),
      intGatewayMasterID: new FormControl(),
      strGatewayID: new FormControl(),
      intPISMasterID: new FormControl(),
      strPISDeviceID: new FormControl(),
      bDisconnected: new FormControl(),
      bDeactivated: new FormControl(),
      decLatitude: new FormControl(),
      decLongitude: new FormControl(),
      strPISMasterNames: new FormControl(),
      strpismasterid: new FormControl(),
      strpisdetails: new FormControl(),

    });

    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }
  public editHandler(args: EditEvent): void {
    const { dataItem } = args;
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      intDevEUI: new FormControl(dataItem.intDevEUI),
      p_check: new FormControl(dataItem.p_check),
      intParkingLotID: new FormControl(dataItem.intParkingLotID),
      strParkingLotName: new FormControl(dataItem.strParkingLotName),
      intSensorParkingSlot: new FormControl(dataItem.intSensorParkingSlot),
      strSlotName: new FormControl(dataItem.strSlotName),
      intVehicleTypeID: new FormControl(dataItem.intVehicleTypeID),
      strDevEUI: new FormControl(dataItem.strDevEUI),
      strDeviceName: new FormControl(dataItem.strDeviceName),
      intApplicationID: new FormControl(dataItem.intApplicationID),
      strApplicationName: new FormControl(dataItem.strApplicationName),
      plotNo: new FormControl(dataItem.plotNo),
      agencyname: new FormControl(dataItem.agencyname),
      intAgencyID: new FormControl(dataItem.intAgencyID),
      strVehicleType: new FormControl(dataItem.strVehicleType),
      intGatewayMasterID: new FormControl(dataItem.intGatewayMasterID),
      strGatewayID: new FormControl(dataItem.strGatewayID),
      intPISMasterID: new FormControl(dataItem.intPISMasterID),
      strPISDeviceID: new FormControl(dataItem.strPISDeviceID),
      bDisconnected: new FormControl(dataItem.bDisconnected),
      bDeactivated: new FormControl(dataItem.bDeactivated),
      decLatitude: new FormControl(dataItem.decLatitude),
      decLongitude: new FormControl(dataItem.decLongitude),
      strPISMasterNames: new FormControl(dataItem.strPISMasterNames),
      strpismasterid: new FormControl(dataItem.strpismasterid),
      strpisdetails: new FormControl(dataItem.strpisdetails),

    });

    this.editedRowIndex = args.rowIndex;
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row

    this.closeEditor(args.sender, args.rowIndex);
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const devicedata: SENSOR = formGroup.value;
    if (devicedata.intDevEUI == null) {
      devicedata.intDevEUI = 0;
      devicedata.bDeactivated = true;
      devicedata.bDisconnected = false;
      devicedata.intAgencyID = 0;//From Dropdown
      devicedata.intGatewayMasterID = 0;//From Dropdown
      // devicedata.intParkingLotID = 0;//From Dropdown
      devicedata.intPISMasterID = 0;
      // devicedata.intVehicleTypeID = 0;//From Dropdown
      devicedata.p_check = 0;
      devicedata.plotNo = "";
      devicedata.intSensorParkingSlot = 0;
      devicedata.strPISDeviceID = 0;//From Dropdown
      devicedata.strPISMasterNames = [];//From Dropdown
      devicedata.strpismasterid = 0;//dropdown
    }
    console.log(this.selectedLotGlobal)
    devicedata.intParkingLotID = this.selectedLotGlobal.intParkingLotID;//From Dropdown
    devicedata.strParkingLotName = this.selectedLotGlobal.strParkingLotName;

    devicedata.intVehicleTypeID = this.selectedTypeGlobal.vehicleTypeID;//From Dropdown
    devicedata.strVehicleType = this.selectedTypeGlobal.vehicleType;

    this.selectedLotGlobal = {intParkingLotID:0, strParkingLotName:""}
    this.selectedTypeGlobal = {vehicleTypeID:0, vehicleType:""}
    console.log(devicedata);

    this.getSensor.SenUpdate(devicedata)
      .subscribe((data: any) => {
        const re = data;
        console.log(1)
        this.onStateChange();
      },
        (error: any) => {
          console.log(error.error.message);
        }
      );
      // window.location.reload();  
    sender.closeRow(rowIndex);
  }
  public removeHandler(args: RemoveEvent): void {

  }
  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    // close the editor
    grid.closeRow(rowIndex);
    // reset the helpers
    this.editedRowIndex = 0;
    this.formGroup;
  }
  public ActivateDeActivate(dataItem) {
    
    this.getSensor.SenStatus(dataItem)
      .subscribe((data: any) => {
        const re = data;
        this.onStateChange()
      },
        (error: any) => {
          console.log(error.error.message);
        }
      );
  }

  //Lot DropDown
  public defaultLot: { intParkingLotID: number | null; strParkingLotName: string } = {
    intParkingLotID: null,
    strParkingLotName: 'Select Lot',
  };
  public selectedLot: { intParkingLotID: number; strParkingLotName: string };

  handleLotChange(value) {
    this.selectedLot = value;
    this.selectedLotGlobal = value;
    console.log(this.selectedLotGlobal)
  }

  //Vehicle Type DropDown
  public defaultVehicleType: { vehicleTypeID: number | null; vehicleType: string } = {
    vehicleTypeID: null,
    vehicleType: 'Select Vehicle Type',
  };

  public dataVehicle: Array<{ vehicleTypeID: number; vehicleType: string }> = [
    { vehicleTypeID: 1, vehicleType: '2 Wheeler' },
    { vehicleTypeID: 3, vehicleType: '4 Wheeler' },
  ];
  public selectedType: { vehicleTypeID: number; vehicleType: string };

  handleCategoryChange(value) {
    this.selectedType = value;
    this.selectedTypeGlobal = value;

  }


}
