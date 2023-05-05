import { Component } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { ETM, temp } from './model'
import { Observable } from 'rxjs';
import { DeviceService } from './device.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddEvent, GridDataResult, CancelEvent, EditEvent, RemoveEvent, SaveEvent, GridComponent } from '@progress/kendo-angular-grid';
import { state, trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-devicemaster',
  templateUrl: './devicemaster.component.html',
  styleUrls: ['./devicemaster.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class DevicemasterComponent {

  public formGroup: FormGroup;
  private editedRowIndex: number;

  public gridData: any;

  visible = false;

  constructor(private getDevice: DeviceService) {
    this.getDevice.registerDev()
      .subscribe(data => {
        this.gridData = [data].pop();
      })

  }

  
  public onStateChange(): void {
    this.getDevice.registerDev()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({
      intDeviceID: new FormControl(),
      strDeviceNo: new FormControl(),
      strDeviceModel: new FormControl(),
      strDeviceToken: new FormControl(),
      intParkingLotID: new FormControl(),
      strParkingLotName: new FormControl(),
      strETMSimNumber: new FormControl(),
      dteETMDeviceWarrantyStartDate: new FormControl(),
      strETMDeviceWarrantyStartDate: new FormControl(),
      strETMDeviceWarrantyEndDate: new FormControl(),
      dteETMDeviceWarrantyEndDate: new FormControl(),
      strRemarks: new FormControl(),
      dteModified: new FormControl(),
      bActive: new FormControl(),
      bDeleted: new FormControl()
    });
    alert(2);
    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }
  public editHandler(args: EditEvent): void {
    // define all editable fields validators and default values
    const { dataItem } = args;
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      intDeviceID: new FormControl(dataItem.intDeviceID),
      strDeviceNo: new FormControl(dataItem.strDeviceNo),
      strDeviceModel: new FormControl(dataItem.strDeviceModel),
      strDeviceToken: new FormControl(dataItem.strDeviceToken),
      intParkingLotID: new FormControl(dataItem.intParkingLotID),
      strParkingLotName: new FormControl(dataItem.strParkingLotName),
      strETMSimNumber: new FormControl(dataItem.strETMSimNumber),
      dteETMDeviceWarrantyStartDate: new FormControl(dataItem.dteETMDeviceWarrantyStartDate),
      strETMDeviceWarrantyStartDate: new FormControl(dataItem.strETMDeviceWarrantyStartDate),
      strETMDeviceWarrantyEndDate: new FormControl(dataItem.strETMDeviceWarrantyEndDate),
      dteETMDeviceWarrantyEndDate: new FormControl(dataItem.dteETMDeviceWarrantyEndDate),
      strRemarks: new FormControl(dataItem.strRemarks),
      dteModified: new FormControl(dataItem.dteModified),
      bActive: new FormControl(dataItem.bActive),
      bDeleted: new FormControl(dataItem.bDeleted),
    });

    this.editedRowIndex = args.rowIndex;
    // put the row in edit mode, with the `FormGroup` build above
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    this.closeEditor(args.sender, args.rowIndex);
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    
    
    const devicedata: ETM = formGroup.value;
    //console.log(devicedata);
    //alert(1);
    if(devicedata.intDeviceID == null){
      devicedata.intDeviceID = 0;
      devicedata.bActive = true;
      devicedata.bDeleted = false;
      devicedata.intParkingLotID = 0;
      devicedata.dteModified = '2022-05-14T12:47:34.009985';
    }
    console.log(devicedata);
    // let temp = devicedata.pop()!;
    this.getDevice.DeviceUpdate(devicedata)
    .subscribe((data: any) => {
      const re = data;
      this.onStateChange();  
    },
      (error: any) => {
        console.log(error.error.message);
      }
    );
    
    //this.getDevice.save(product, isNew);

    sender.closeRow(rowIndex);
  }
  public removeHandler(args: RemoveEvent): void {
    // remove the current dataItem from the current data source,
    // `editService` in this example
    
    console.log(args.dataItem);
    this.getDevice.DeviceDelete(args.dataItem)
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
  public ActivateDeActivate(dataItem){
    alert(1);
    console.log(dataItem);
    this.getDevice.DeviceStatus(dataItem)
    .subscribe((data: any) => {
      const re = data;      
      this.onStateChange();
    },
      (error: any) => {
        console.log(error.error.message);
      }
    );
  }


  showMessage() {
    this.visible = !this.visible;
  }



}
