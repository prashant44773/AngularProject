import { Component } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { GATEWAY } from './gatewaymodel'

import { GatewayService } from './gateway.service';

import { FormGroup, FormControl } from '@angular/forms';
import { AddEvent, CancelEvent, EditEvent, RemoveEvent, SaveEvent, GridComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-gatewaymaster',
  templateUrl: './gatewaymaster.component.html',
  styleUrls: ['./gatewaymaster.component.css']
})
export class GatewaymasterComponent {
  public formGroup: FormGroup;
  private editedRowIndex: number;
  public gridData: any;
  public selectedLotGlobal: { intParkingLotID: number; strParkingLotName: string } = {
    intParkingLotID:0,strParkingLotName:""
  };
  public LotList: any = [];


  constructor(private getGateway: GatewayService) {
    this.getGateway.GetGateway()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
      this.getGateway.GetLotIDAndName()
      .subscribe(data => {
        this.LotList = data;
      })
  }

  public onStateChange(state: State): void {
    this.getGateway.GetGateway()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({
      intGatewayMasterID: new FormControl(),
      strName: new FormControl(),
      strGatewayName: new FormControl(),
      intGateWaySeqID: new FormControl(),
      strGatewayID: new FormControl(),
      dteCreatedOn: new FormControl(),
      bDisconnected: new FormControl(),
      strParkingLotNames: new FormControl(),
      strParkingLotName: new FormControl(),
      ParkingLots: new FormControl(),
      ParkingLot: new FormControl(),
      strLocationName: new FormControl(),
      
    });

    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }
  public editHandler(args: EditEvent): void {
    const { dataItem } = args;
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      intGatewayMasterID: new FormControl(dataItem.intGatewayMasterID),
      strName: new FormControl(dataItem.strName),
      strGatewayName: new FormControl(dataItem.strGatewayName),
      intGateWaySeqID: new FormControl(dataItem.intGateWaySeqID),
      strGatewayID: new FormControl(dataItem.strGatewayID),
      dteCreatedOn: new FormControl(dataItem.dteCreatedOn),
      bDisconnected: new FormControl(dataItem.bDisconnected),
      strParkingLotNames: new FormControl(dataItem.strParkingLotNames),
      strParkingLotName: new FormControl(dataItem.strParkingLotName),
      ParkingLots: new FormControl(dataItem.ParkingLots),
      ParkingLot: new FormControl(dataItem.ParkingLot),
      strLocationName: new FormControl(dataItem.strLocationName),
      
    });
    console.log(this.LotList);
    
    this.editedRowIndex = args.rowIndex;
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
   
    this.closeEditor(args.sender, args.rowIndex);
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const devicedata: GATEWAY = formGroup.value;
    if (devicedata.intGatewayMasterID == null) {
      devicedata.intGatewayMasterID = 0;
      devicedata.bDisconnected = false;
      
      devicedata.dteCreatedOn = '2022-05-14T12:47:34.009985';
      
    }
    devicedata.ParkingLot = this.selectedLotGlobal.strParkingLotName;//From Drop Down
    devicedata.ParkingLots = this.selectedLotGlobal.intParkingLotID.toString()//From Drop Down
    devicedata.strParkingLotNames = [this.selectedLotGlobal.intParkingLotID];
    console.log(devicedata);
    this.getGateway.GatewayUpdate(devicedata)
      .subscribe((data: any) => {
        const re = data;
      },
        (error: any) => {
          console.log(error.error.message);
        }
      );
    sender.closeRow(rowIndex);
  }
  public removeHandler(args: RemoveEvent): void {
    
  }
  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = 0;
    this.formGroup;
  }
  public ActivateDeActivate(dataItem) {
    
    this.getGateway.GatewayStatus(dataItem)
      .subscribe((data: any) => {
        const re = data;
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
  }

}
