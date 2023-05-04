import { Component } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { PIS, lotwithID } from './pismodel'

import { PisService } from './pis.service';

import { FormGroup, FormControl } from '@angular/forms';
import { AddEvent, CancelEvent, EditEvent, RemoveEvent, SaveEvent, GridComponent } from '@progress/kendo-angular-grid';


@Component({
  selector: 'app-pismaster',
  templateUrl: './pismaster.component.html',
  styleUrls: ['./pismaster.component.css']
})
export class PismasterComponent {
  public formGroup: FormGroup;
  private editedRowIndex: number;
  public gridData: any;
  public categories: any ;
  public selectedValues: any = [];
  public llID:any[] = [];
  public lotName:string = "";

  constructor(private getPIS: PisService) {
    
    this.getPIS.GetPis()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
      this.getPIS.GetLotIDAndName()
      .subscribe(data => {
        this.categories = data;
      })

  }
  public ResetPage(){
    this.getPIS.GetPis()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
  }
  public category(id: number): lotwithID | undefined {
    return this.categories.find((l) => l.intParkingLotID === id);
    //return this.categories.find((x) => x.intParkingLotID === id);
  }

  public onStateChange(state: State): void {
    this.getPIS.GetPis()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({
      intPISMasterID: new FormControl(),
      strPISDeviceID: new FormControl(),
      strPISDeviceIMEI: new FormControl(),
      strPISDeviceMake: new FormControl(),
      strPISDeviceModel: new FormControl(),
      intPISSeqID: new FormControl(),
      intParkingLotID: new FormControl(),
      strRemarks: new FormControl(),
      dteWarrantyStartDate: new FormControl(),
      dteWarrantyEndDate: new FormControl(),
      strParkingLotNames: new FormControl(),
      ParkingLot: new FormControl(),
      strWarrantyStartDate: new FormControl(),
      strWarrantyEndDate: new FormControl(),
      ParkingLots: new FormControl(),
      strPISDeviceSimNumber: new FormControl(),
      dteModifiedOn: new FormControl(),
      bActive: new FormControl(),
      bDeleted: new FormControl()
    });

    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }
  public editHandler(args: EditEvent): void {
    const { dataItem } = args;
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      intPISMasterID: new FormControl(dataItem.intPISMasterID),
      strPISDeviceID: new FormControl(dataItem.strPISDeviceID),
      strPISDeviceIMEI: new FormControl(dataItem.strPISDeviceIMEI),
      strPISDeviceMake: new FormControl(dataItem.strPISDeviceMake),
      strPISDeviceModel: new FormControl(dataItem.strPISDeviceModel),
      intPISSeqID: new FormControl(dataItem.intPISSeqID),
      intParkingLotID: new FormControl(dataItem.intParkingLotID),
      strRemarks: new FormControl(dataItem.strRemarks),
      dteWarrantyStartDate: new FormControl(dataItem.dteWarrantyStartDate),
      dteWarrantyEndDate: new FormControl(dataItem.dteWarrantyEndDate),
      strParkingLotNames: new FormControl(dataItem.strParkingLotNames),
      ParkingLot: new FormControl(dataItem.ParkingLot),
      strWarrantyStartDate: new FormControl(dataItem.strWarrantyStartDate),
      strWarrantyEndDate: new FormControl(dataItem.strWarrantyEndDate),
      ParkingLots: new FormControl(dataItem.ParkingLots),
      strPISDeviceSimNumber: new FormControl(dataItem.strPISDeviceSimNumber),
      dteModifiedOn: new FormControl(dataItem.dteModifiedOn),
      bActive: new FormControl(dataItem.bActive),
      bDeleted: new FormControl(dataItem.bDeleted)
    });
    let arrlot = args.dataItem.strParkingLotNames;
    for (let c in arrlot) {
      for (let t in this.categories) {
        if (arrlot[c] == this.categories[t].intParkingLotID) {
          this.selectedValues.push(this.categories[t]);
        }
      }
    }
    this.editedRowIndex = args.rowIndex;
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    this.selectedValues = [];
    this.llID = [];
    this.lotName = "";
    this.closeEditor(args.sender, args.rowIndex);
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const devicedata: PIS = formGroup.value;
    if (devicedata.intPISMasterID == null) {
      devicedata.intPISMasterID = 0;
      devicedata.bActive = true;
      devicedata.bDeleted = false;
      devicedata.intParkingLotID = 0;
      devicedata.dteModifiedOn = '2022-05-14T12:47:34.009985';
    }
    
    for (let lID in this.selectedValues) {
      this.llID.push(this.selectedValues[lID].intParkingLotID);
      this.lotName = this.lotName + this.selectedValues[lID].strParkingLotName + ",";
    }
    
    this.lotName = this.lotName.substring(0, this.lotName.length - 1);
    devicedata.strParkingLotNames = this.llID;
    devicedata.ParkingLot = this.lotName;
    devicedata.ParkingLots = this.llID.toString();

    this.selectedValues = [];
    this.llID = [];
    this.lotName = "";
    

    this.getPIS.PISUpdate(devicedata)
      .subscribe((data: any) => {
        const re = data;
        this.ResetPage();
      },
        (error: any) => {
          console.log(error.error.message);
        }
      );
    sender.closeRow(rowIndex);
  }
  public removeHandler(args: RemoveEvent): void {
    // remove the current dataItem from the current data source,
    // `editService` in this example

    this.getPIS.PISDelete(args.dataItem)
      .subscribe((data: any) => {
        const re = data;
        this.ResetPage();
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
    
    this.getPIS.PISStatus(dataItem)
      .subscribe((data: any) => {
        const re = data;
        this.ResetPage();
      },
        (error: any) => {
          console.log(error.error.message);
        }
      );
  }


}
