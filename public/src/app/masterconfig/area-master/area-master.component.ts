import { Component } from '@angular/core';
import { AreaService } from './area.service';
import {
  EditEvent,
  SaveEvent,
  CancelEvent,
  RemoveEvent,
  AddEvent,
} from '@progress/kendo-angular-grid';
import { FormControl, FormGroup } from '@angular/forms';
import { Area } from './Area';
import { City } from '../city-master/cityModel';

@Component({
  selector: 'app-area-master',
  templateUrl: './area-master.component.html',
  styleUrls: ['./area-master.component.css'],
})
export class AreaMasterComponent {
  AddNewRow = false;

  AreaMasterGet: any;

  CityList: any = [];

  CollectorsList: any = [];

  CollectorValueDropdown:any;
  CityValueDropdown:any;

  constructor(private AreaMaster: AreaService) {
    this.AreaMaster.AreaMasterGet().subscribe((res: any) => {
      this.AreaMasterGet = res;
      console.log(this.AreaMasterGet);
    });
  }

  ReloadApi() {
    // Calling the Get Method AGAIN
    this.AreaMaster.AreaMasterGet().subscribe((res: any) => {
      this.AreaMasterGet = res;
      console.log(this.AreaMasterGet);
    });
  }

  GetDropdownLists() {
    let city;
    let collector;

    this.AreaMaster.AreaMasterCityName().subscribe((res)=>{
        city = res;
        // console.log(city);

        city.forEach((element) => {
          this.CityList.push(element.strCityName);
        });

      });
    // console.log(this.CityList);


    this.AreaMaster.AreaMasterCollectorName().subscribe((res)=>{
        collector = res;
        console.log(collector);

        collector.forEach(element => {
          this.CollectorsList.push(element.strUserName);
        });
    })
    // console.log(this.CollectorsList);
  }

  // CRUD in Kendo-Grid

  protected editHandler(args: EditEvent): void {
    const group = new FormGroup({
      intAreaID: new FormControl(args.dataItem.intAreaID),
      intCityID: new FormControl(args.dataItem.intCityID),
      intUserID: new FormControl(args.dataItem.intUserID),
      strAreaName: new FormControl(args.dataItem.strAreaName),
      strCityName: new FormControl(args.dataItem.strCityName),
      strUserName: new FormControl(args.dataItem.strUserName),
      strAddress: new FormControl(args.dataItem.strAddress),
      decLongitude: new FormControl(args.dataItem.decLongitude),
      decLatitude: new FormControl(args.dataItem.decLatitude),
      strRemarks: new FormControl(args.dataItem.strRemarks),
      // bActive: new FormControl(args.dataItem.bActive),
      // other fields
    });

    args.sender.editRow(args.rowIndex, group);

    this.GetDropdownLists(); // Get Data For the DropDown Lists in Grid
  }

  public saveHandler(args: SaveEvent): void {
    if (this.AddNewRow) {
      // console.log('Saving the New Row');
      const bodyAddRow: Area = args.formGroup.value;
      bodyAddRow.intCityID = 0;
      bodyAddRow.intUserID = 0;
      console.log(bodyAddRow);

      args.sender.closeRow(args.rowIndex);

      this.AreaMaster.AreaMasterAdd(bodyAddRow).subscribe((res) => {
        console.log(res);

        // Reload Api
        this.ReloadApi();
      });

      this.AddNewRow = false;
    } else {
      // my if else logic
      args.sender.closeRow(args.rowIndex);

      const bodyEdit: Area = args.formGroup.value;
      bodyEdit.strCityName = this.CityValueDropdown;
      bodyEdit.strUserName = this.CollectorValueDropdown;
      console.log(bodyEdit);
      this.AreaMaster.AreaMasterEdit(bodyEdit).subscribe((res: any) => {
        console.log(res);

        // Reload Api
        this.ReloadApi();

        this.CityValueDropdown = null;
        this.CollectorValueDropdown = null;
      });
    }
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    args.sender.closeRow(args.rowIndex);
  }

  public removeHandler(args: RemoveEvent): void {
    const bodyDel: Area = args.dataItem;
    this.AreaMaster.AreaMasterDel(bodyDel).subscribe((res) => {
      console.log(res);

      // Reload Api
      this.ReloadApi();
    });
  }

  public addHandler(args: AddEvent): void {
    this.GetDropdownLists();

    const group = new FormGroup({
      strAreaName: new FormControl(),
      strCityName: new FormControl(),
      strUserName: new FormControl(),
      strAddress: new FormControl(),
      decLongitude: new FormControl(),
      decLatitude: new FormControl(),
      strRemarks: new FormControl(),
      // bActive: new FormControl(),
    });

    args.sender.addRow(group);

    this.AddNewRow = true;
  }

  Action(dataItem) {
    const bodyDel: Area = dataItem;
    console.log(bodyDel);
    this.AreaMaster.AreaMasterActive(bodyDel).subscribe((res) => {
      console.log(res);
      this.ReloadApi();
    });
    // alert(`Field Switched by ID : + ${bodyDel.intCityID}`);
    // Reload Api
  }

  CollectorValueFromDropdown(value){
    this.CollectorValueDropdown = value;
  }

  CityValueFromDropdown(value){
    this.CityValueDropdown = value;
  }
}
