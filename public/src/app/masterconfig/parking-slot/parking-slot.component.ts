import { Component } from '@angular/core';
import {
  AddEvent,
  RemoveEvent,
  CancelEvent,
  SaveEvent,
  EditEvent,
} from '@progress/kendo-angular-grid';
import { FormGroup, FormControl } from '@angular/forms';
import { ParkingSlot } from './ParkingSlot';
import { ParkingSlotService } from './parking-slot.service';
import { ListModelForDropdown } from './ListModel';

@Component({
  selector: 'app-parking-slot',
  templateUrl: './parking-slot.component.html',
  styleUrls: ['./parking-slot.component.css'],
})
export class ParkingSlotComponent {
  AddNewRow = false;

  ParkingSlotMasterGet: any;

  LotList: ListModelForDropdown[] = [];

  VehicleList: ListModelForDropdown[] = [];

  obj: ListModelForDropdown;

  LotValueDropdown: any;
  VehicleValueDropdown: any;

  constructor(private ParkingSlotMaster: ParkingSlotService) {
    this.ParkingSlotMaster.ParkingSlotMasterGet().subscribe((res: any) => {
      this.ParkingSlotMasterGet = res;
      console.log(this.ParkingSlotMasterGet);
    });
  }

  ReloadApi() {
    // Calling the Get Method AGAIN
    this.ParkingSlotMaster.ParkingSlotMasterGet().subscribe((res: any) => {
      this.ParkingSlotMasterGet = res;
      console.log(this.ParkingSlotMasterGet);
    });
  }

  ResetVariables() {
    // Reset this Values
    this.LotValueDropdown = null;
    this.VehicleValueDropdown = null;
    this.VehicleList = [];
    this.LotList = [];
  }

  GetDropdownLists() {
    let Lot;
    let vehicle;

    this.ParkingSlotMaster.GetLotNames().subscribe((res) => {
      Lot = res;
      // console.log(city);

      Lot.forEach((element) => {
        this.obj = {
          id: element.intParkingLotID,
          name: element.strParkingLotName,
        };

        this.LotList.push(this.obj);
      });
    });
    // console.log(this.LotList);

    this.ParkingSlotMaster.GetVehicleNames().subscribe((res) => {
      vehicle = res;
      // console.log(area);

      vehicle.forEach((element) => {
        this.obj = {
          id: element.intVehicleTypeID,
          name: element.strVehicleType,
        };
        this.VehicleList.push(this.obj);
      });
    });
    // console.log(this.VehicleList);
  }

  // CRUD in Kendo-Grid

  protected editHandler(args: EditEvent): void {
    this.GetDropdownLists(); // Get Data For the DropDown Lists in Grid

    const group = new FormGroup({
      intParkingSlotID: new FormControl(args.dataItem.intParkingSlotID),
      intParkingLotID: new FormControl(args.dataItem.intParkingLotID),
      strParkingLotName: new FormControl(args.dataItem.strParkingLotName),
      intVehicleTypeID: new FormControl(args.dataItem.intVehicleTypeID),
      intTotalSlots: new FormControl(args.dataItem.intTotalSlots),
      strVehicleType: new FormControl(args.dataItem.strVehicleType),
      dteModifiedOn: new FormControl(args.dataItem.dteModifiedOn),
      bActive: new FormControl(args.dataItem.bActive),
      bDeleted: new FormControl(args.dataItem.bDeleted),
      // other fields
    });

    args.sender.editRow(args.rowIndex, group);
  }

  public saveHandler(args: SaveEvent): void {
    if (this.AddNewRow) {
      this.GetDropdownLists(); // Get Data For the DropDown Lists in Grid
      // alert('Saving the New Row');

      const bodyAddRow: ParkingSlot = args.formGroup.value;

      bodyAddRow.intParkingLotID = this.LotValueDropdown.id;
      bodyAddRow.strParkingLotName = this.LotValueDropdown.name;

      bodyAddRow.intVehicleTypeID = this.VehicleValueDropdown.id;
      bodyAddRow.strVehicleType = this.VehicleValueDropdown.name;

      // Dummy Values For Api Call
      bodyAddRow.intParkingSlotID = 0;
      bodyAddRow.dteModifiedOn = new Date();
      bodyAddRow.bActive = false;
      bodyAddRow.bDeleted = false;
      // Dummy Values For Api Call

      console.log(bodyAddRow);

      args.sender.closeRow(args.rowIndex);

      this.ParkingSlotMaster.ParkingSlotMasterAdd(bodyAddRow).subscribe(
        (res) => {
          console.log(res);
          // Reload Api
          this.ReloadApi();
        }
      );

      // Reset this Values
      this.ResetVariables();

      this.AddNewRow = false;
    } else {
      // my if else logic
      args.sender.closeRow(args.rowIndex);

      const bodyEdit: ParkingSlot = args.formGroup.value;

      bodyEdit.intParkingLotID = this.LotValueDropdown.id;
      bodyEdit.strParkingLotName = this.LotValueDropdown.name;

      bodyEdit.intVehicleTypeID = this.VehicleValueDropdown.id;
      bodyEdit.strVehicleType = this.VehicleValueDropdown.name;

      console.log(bodyEdit);

      this.ParkingSlotMaster.ParkingSlotMasterEdit(bodyEdit).subscribe(
        (res: any) => {
          console.log(res);

          // Reload Api
          this.ReloadApi();

          // Reset this Values
          this.ResetVariables();
        }
      );
      // Reset this Values
      this.ResetVariables();
    }
  }

  public cancelHandler(args: CancelEvent): void {
    // Reset this Values
    this.ResetVariables();

    // close the editor for the given row
    args.sender.closeRow(args.rowIndex);
  }

  public removeHandler(args: RemoveEvent): void {
    const bodyDel: ParkingSlot = args.dataItem;
    this.ParkingSlotMaster.ParkingSlotMasterDel(bodyDel).subscribe((res) => {
      console.log(res);
      // Reload Api
      this.ReloadApi();
    });
  }

  public addHandler(args: AddEvent): void {
    this.GetDropdownLists();

    const group = new FormGroup({
      intParkingSlotID: new FormControl(),
      intParkingLotID: new FormControl(),
      strParkingLotName: new FormControl(),
      intVehicleTypeID: new FormControl(),
      intTotalSlots: new FormControl(),
      strVehicleType: new FormControl(),
      dteModifiedOn: new FormControl(),
      bActive: new FormControl(),
      bDeleted: new FormControl(),
    });

    args.sender.addRow(group);

    this.AddNewRow = true;
  }

  Action(dataItem) {
    const bodyActivate: ParkingSlot = dataItem;
    // console.log(bodyActivate);
    this.ParkingSlotMaster.ParkingSlotMasterActive(bodyActivate).subscribe(
      (res) => {
        console.log(res);
        this.ReloadApi();
      }
    );
  }

  CityValueFromDropdown(value) {
    this.LotValueDropdown = value;
  }

  AreaValueFromDropdown(value) {
    this.VehicleValueDropdown = value;
  }
}
