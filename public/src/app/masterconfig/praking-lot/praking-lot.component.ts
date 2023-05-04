import { Component } from '@angular/core';
import { ParkingLotService } from './parking-lot.service';
import {
  EditEvent,
  SaveEvent,
  CancelEvent,
  RemoveEvent,
  AddEvent,
} from '@progress/kendo-angular-grid';
import { FormControl, FormGroup } from '@angular/forms';
import { ParkLot } from './ParkingLot';
import { ListModelForDropdown } from './ListModel';

@Component({
  selector: 'app-praking-lot',
  templateUrl: './praking-lot.component.html',
  styleUrls: ['./praking-lot.component.css'],
})
export class PrakingLotComponent {
  AddNewRow = false;

  ParkingLotMasterGet: any;

  CityList: ListModelForDropdown[] = [];

  AreaList: any = [];
  obj: ListModelForDropdown;

  CityValueDropdown: any;
  AreaValueDropdown: any;

  constructor(private ParkingLotMaster: ParkingLotService) {
    this.ParkingLotMaster.ParkingLotMasterGet().subscribe((res: any) => {
      this.ParkingLotMasterGet = res;
      console.log(this.ParkingLotMasterGet);
    });
  }

  ReloadApi() {
    // Calling the Get Method AGAIN
    this.ParkingLotMaster.ParkingLotMasterGet().subscribe((res: any) => {
      this.ParkingLotMasterGet = res;
      console.log(this.ParkingLotMasterGet);
    });
  }

  GetDropdownLists() {
    let city;
    let area;

    this.ParkingLotMaster.GetCityName().subscribe((res)=>{
        city = res;
        // console.log(city);

        city.forEach((element) => {
          this.obj = {
              id : element.intCityID,
              name : element.strCityName
          };

          this.CityList.push(this.obj);
        });

      });
    // console.log(this.CityList);

    this.ParkingLotMaster.GetAreaByCity().subscribe((res)=>{
        area = res;
        // console.log(area);

        area.forEach(element => {
          this.obj = {
            id : element.intAreaID,
            name : element.strAreaName
        };
          this.AreaList.push(this.obj);
        });
    })
    // console.log(this.AreaList);
  }

  // CRUD in Kendo-Grid

  protected editHandler(args: EditEvent): void {
    this.GetDropdownLists(); // Get Data For the DropDown Lists in Grid

    const group = new FormGroup({
      intAreaID: new FormControl(args.dataItem.intAreaID),
      intCityID: new FormControl(args.dataItem.intCityID),
      intParkingLotID: new FormControl(args.dataItem.intParkingLotID),
      strAreaName: new FormControl(args.dataItem.strAreaName),
      strCityName: new FormControl(args.dataItem.strCityName),
      strParkingLotName: new FormControl(args.dataItem.strParkingLotName),
      decLatitude: new FormControl(args.dataItem.decLatitude),
      decLongitude: new FormControl(args.dataItem.decLongitude),
      strAddress: new FormControl(args.dataItem.strAddress),
      // bActive: new FormControl(args.dataItem.bActive),
      // other fields
    });

    args.sender.editRow(args.rowIndex, group);
  }

  public saveHandler(args: SaveEvent): void {
    if (this.AddNewRow) {

      this.GetDropdownLists(); // Get Data For the DropDown Lists in Grid
      // alert('Saving the New Row');

      const bodyAddRow: ParkLot = args.formGroup.value;

      bodyAddRow.intCityID = this.CityValueDropdown.id;
      bodyAddRow.strCityName = this.CityValueDropdown.name;

      bodyAddRow.intAreaID = this.AreaValueDropdown.id;
      bodyAddRow.strAreaName = this.AreaValueDropdown.name;
      bodyAddRow.intParkingLotID = 0; // cannot Pass Null Values
      // console.log(bodyAddRow);


      args.sender.closeRow(args.rowIndex);

      this.ParkingLotMaster.ParkingLotMasterAdd(bodyAddRow).subscribe((res) => {
        console.log(res);
        // Reload Api
        this.ReloadApi();
      });

      this.AddNewRow = false;
    } else {
      // my if else logic
      args.sender.closeRow(args.rowIndex);

      const bodyEdit: ParkLot = args.formGroup.value;

      bodyEdit.intCityID = this.CityValueDropdown.id;
      bodyEdit.strCityName = this.CityValueDropdown.name;

      bodyEdit.intAreaID = this.AreaValueDropdown.id;
      bodyEdit.strAreaName = this.AreaValueDropdown.name;
      // console.log(bodyEdit);

      this.ParkingLotMaster.ParkingLotMasterEdit(bodyEdit).subscribe(
        (res: any) => {
          console.log(res);

          // Reload Api
          this.ReloadApi();

          this.CityValueDropdown = null;
          this.AreaValueDropdown = null;
        }
      );
    }
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    args.sender.closeRow(args.rowIndex);
  }

  public removeHandler(args: RemoveEvent): void {
    const bodyDel: ParkLot = args.dataItem;
    this.ParkingLotMaster.ParkingLotMasterDel(bodyDel).subscribe((res) => {
      console.log(res);
      // Reload Api
      this.ReloadApi();
    });
  }

  public addHandler(args: AddEvent): void {
    this.GetDropdownLists();

    const group = new FormGroup({
      intAreaID: new FormControl(),
      intCityID: new FormControl(),
      intParkingLotID: new FormControl(),
      strAreaName: new FormControl(),
      strCityName: new FormControl(),
      strParkingLotName: new FormControl(),
      decLatitude: new FormControl(),
      decLongitude: new FormControl(),
      strAddress: new FormControl(),
      // bActive: new FormControl(),
    });

    args.sender.addRow(group);

    this.AddNewRow = true;
  }

  Action(dataItem) {
    const bodyActivate: ParkLot = dataItem;
    // console.log(bodyActivate);
    this.ParkingLotMaster.ParkingLotMasterActive(bodyActivate).subscribe((res) => {
      console.log(res);
      this.ReloadApi();
    });
  }

  CityValueFromDropdown(value) {
    this.CityValueDropdown = value;
  }

  AreaValueFromDropdown(value) {
    this.AreaValueDropdown = value;
  }
}
