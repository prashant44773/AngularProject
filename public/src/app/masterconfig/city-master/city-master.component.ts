import { Component } from '@angular/core';
import { CityMasterService } from './city-master.service';
import {
  EditEvent,
  SaveEvent,
  CancelEvent,
  GridComponent,
  RemoveEvent,
  AddEvent,
} from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { City } from './cityModel';
import { ButtonThemeColor } from "@progress/kendo-angular-buttons";

@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.css'],
})
export class CityMasterComponent {
  AddNewRow = false;

  CityMasterGet: any;

  constructor(private CityMaster: CityMasterService) {
    this.CityMaster.CityMasterGet().subscribe((res: any) => {
      this.CityMasterGet = res;
      console.log(this.CityMasterGet);
    });
  }

  ReloadApi() {
    // Calling the Get Method AGAIN
    this.CityMaster.CityMasterGet().subscribe((res: any) => {
      this.CityMasterGet = res;
      console.log(this.CityMasterGet);
    });
  }

  // CRUD in Kendo-Grid

  protected editHandler(args: EditEvent): void {
    const group = new FormGroup({
      intCityID: new FormControl(args.dataItem.intCityID),
      strCityName: new FormControl(args.dataItem.strCityName),
      strAddress: new FormControl(args.dataItem.strAddress),
      strManagerName: new FormControl(args.dataItem.strManagerName),
      strRemarks: new FormControl(args.dataItem.strRemarks),
      dteModifiedOn: new FormControl(args.dataItem.dteModifiedOn),
      bActive: new FormControl(args.dataItem.bActive),
      bDeleted: new FormControl(args.dataItem.bDeleted),
      // other fields
    });
    args.sender.editRow(args.rowIndex, group);
  }

  public saveHandler(args: SaveEvent): void {
    if (this.AddNewRow) {
      // console.log('Saving the New Row');
      const bodyAddRow: City = args.formGroup.value;
      console.log(bodyAddRow);

      args.sender.closeRow(args.rowIndex);

      this.CityMaster.CityMasterAdd(bodyAddRow).subscribe((res) => {
        console.log(res);

        // Reload Api
        this.ReloadApi();
      });

      this.AddNewRow = false;
    } else {
      // my if else logic
      args.sender.closeRow(args.rowIndex);

      const bodyEdit: City = args.formGroup.value;
      this.CityMaster.CityMasterEdit(bodyEdit).subscribe((res: any) => {
        console.log(res);

        // Reload Api
        this.ReloadApi();
      });
    }
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    args.sender.closeRow(args.rowIndex);
  }

  public removeHandler(args: RemoveEvent): void {
    const bodyDel: City = args.dataItem;
    this.CityMaster.CityMasterDel(bodyDel).subscribe((res) => {
      console.log(res);

      // Reload Api
      this.ReloadApi();
    });
  }

  public addHandler(args: AddEvent): void {
    const group = new FormGroup({
      // 'ProductID': new FormControl(),
      // intCityID: new FormControl(),
      strCityName: new FormControl(),
      strAddress: new FormControl(),
      strManagerName: new FormControl(),
      strRemarks: new FormControl(),
      // dteModifiedOn: new FormControl(),
      // bActive: new FormControl(),
      // bDeleted: new FormControl(),
    });

    args.sender.addRow(group);

    this.AddNewRow = true;
  }

  Action(dataItem) {
    const bodyDel: City = dataItem;
    console.log(bodyDel);
    this.CityMaster.CityMasterActive(bodyDel).subscribe((res) => {
      console.log(res);
      this.ReloadApi();
    });
    // alert(`Field Switched by ID : + ${bodyDel.intCityID}`);

    // Reload Api
  }
}
