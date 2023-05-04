import { Component } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { FormGroup, FormControl } from '@angular/forms';
import { AssignmentService } from './assignment.service'
import { AddEvent, CancelEvent, EditEvent, RemoveEvent, SaveEvent, GridComponent } from '@progress/kendo-angular-grid';
import { ASSIGN } from './assignmentmodel';

@Component({
  selector: 'app-userassignment',
  templateUrl: './userassignment.component.html',
  styleUrls: ['./userassignment.component.css']
})
export class UserassignmentComponent {
  public formGroup: FormGroup;
  private editedRowIndex: number;
  public gridData: any;
  public selectedAreas: any = [];
  public selectedLots: any = [];

  //Admin
  public AdminList: any = [];
  public globalAdmin: any;
  

  //For Area And Lot DropDown
  public isDisabledLot = true;
  constructor(private getAssignment: AssignmentService) {
    this.getAssignment.GetAssign()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
    this.getAssignment.GetAdmin()
      .subscribe(data => {
        this.AdminList = [data].pop();
      })
  }
  public onStateChange(state: State): void {
    this.getAssignment.GetAssign()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
  }
  public ResetPage(){
    this.getAssignment.GetAssign()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({
      intUserAssignmentID: new FormControl(),
      intUserID: new FormControl(),
      strUserName: new FormControl(),
      intAreaID: new FormControl(),
      strAreaName: new FormControl(),
      intLotID: new FormControl(),
      intParkingLotID: new FormControl(),
      strParkingLotName: new FormControl(),
      strAreaNames: new FormControl(),
      strAreaIDs: new FormControl(),
      strLotIDs: new FormControl(),
      strParkingLotNames: new FormControl(),
      intCreatedBy: new FormControl(),
      intModifiedBy: new FormControl(),
      dteModifiedOn: new FormControl(),
      dteCreatedOn: new FormControl(),
      bActive: new FormControl(),
      bDeleted: new FormControl(),

    });

    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }
  public editHandler(args: EditEvent): void {
    const { dataItem } = args;
    console.log(args);
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      intUserAssignmentID: new FormControl(dataItem.intUserAssignmentID),
      intUserID: new FormControl(dataItem.intUserID),
      strUserName: new FormControl(dataItem.strUserName),
      intAreaID: new FormControl(dataItem.intAreaID),
      strAreaName: new FormControl(dataItem.strAreaName),
      intLotID: new FormControl(dataItem.intLotID),
      intParkingLotID: new FormControl(dataItem.intParkingLotID),
      strParkingLotName: new FormControl(dataItem.strParkingLotName),
      strAreaNames: new FormControl(dataItem.strAreaNames),
      strAreaIDs: new FormControl(dataItem.strAreaIDs),
      strLotIDs: new FormControl(dataItem.strLotIDs),
      strParkingLotNames: new FormControl(dataItem.strParkingLotNames),
      intCreatedBy: new FormControl(dataItem.intCreatedBy),
      intModifiedBy: new FormControl(dataItem.intModifiedBy),
      dteModifiedOn: new FormControl(dataItem.dteModifiedOn),
      dteCreatedOn: new FormControl(dataItem.dteCreatedOn),
      bActive: new FormControl(dataItem.bActive),
      bDeleted: new FormControl(dataItem.bDeleted),
    });

    this.editedRowIndex = args.rowIndex;
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    this.closeEditor(args.sender, args.rowIndex);
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const devicedata: ASSIGN = formGroup.value;

    if (devicedata.intUserAssignmentID == null) {
      devicedata.intUserAssignmentID = 0;
      devicedata.intLotID = 0;
      devicedata.intCreatedBy = 0;
      devicedata.intModifiedBy = 0;
      devicedata.intParkingLotID = 0;
      devicedata.dteCreatedOn = "0001-01-01T00:00:00";
      devicedata.dteModifiedOn = "0001-01-01T00:00:00"
    }
    devicedata.intUserID = this.globalAdmin.intUserID;
    devicedata.strUserName  = this.globalAdmin.strUserName;
    devicedata.intAreaID = 0;
    devicedata.strAreaName = null;

    devicedata.strParkingLotNames = "";
    devicedata.strLotIDs = "";
    devicedata.strAreaIDs = "";
    devicedata.strAreaNames = "";

    for (let i = 0; i < this.selectedAreas.length; i++) {
      devicedata.strAreaNames += this.selectedAreas[i].AreaName + ",";
      devicedata.strAreaIDs += String(this.selectedAreas[i].AreaID) + ",";
    }
    devicedata.strAreaNames =devicedata.strAreaNames.substring(0, devicedata.strAreaNames.length - 1);
    devicedata.strAreaIDs = devicedata.strAreaIDs.substring(0, devicedata.strAreaIDs.length - 2);
    
    for (let i = 0; i < this.selectedLots.length; i++) {
      devicedata.strParkingLotNames += this.selectedLots[i].LotName + ",";
      devicedata.strLotIDs += String(this.selectedLots[i].LotID) + ",";
    }
    devicedata.strParkingLotNames = devicedata.strParkingLotNames.substring(0, devicedata.strParkingLotNames.length - 1);
    devicedata.strLotIDs = devicedata.strLotIDs.substring(0, devicedata.strLotIDs.length - 1);

    
    console.log(devicedata);

   
    this.getAssignment.AssignUpdate(devicedata)
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

    // this.getAssignment.AssignDelete(args.dataItem)
    //   .subscribe((data: any) => {
    //     const re = data;
    //   },
    //     (error: any) => {
    //       console.log(error.error.message);
    //     }
    //   );

  }
  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    // close the editor
    grid.closeRow(rowIndex);
    // reset the helpers
    this.editedRowIndex = 0;
    this.formGroup;
  }
  public ActivateDeActivate(dataItem) {

    // this.getAssignment.AssignStatus(dataItem)
    //   .subscribe((data: any) => {
    //     const re = data;
    //   },
    //     (error: any) => {
    //       console.log(error.error.message);
    //     }
    //   );
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

  public dataArea: Array<{ AreaID: number; AreaName: string }> = [
    { AreaID: 38, AreaName: 'Patto' },
    { AreaID: 42, AreaName: 'Passport' },
  ];
  public dataLot: Array<{ LotID: number; LotName: string; AreaID: number }> = [
    { LotID: 81, LotName: 'Opp City Centre', AreaID: 38 },
    { LotID: 82, LotName: 'Opp Dempo Tower', AreaID: 38 },
    { LotID: 80, LotName: 'Opp SBI Bank', AreaID: 38 },
    { LotID: 101, LotName: 'Behind Sesa Ghor', AreaID: 38 },
    { LotID: 85, LotName: 'Opp Passport_01', AreaID: 42 },
    { LotID: 92, LotName: 'Opp Passport_02', AreaID: 42 },
  ];


  public dataResultLot: any[] = [];
  public temp: any[] = [];
  public selectedArea: { AreaID: number; AreaName: string };
  public selectedLot: { LotID: number; LotName: string };

  handleAreaChange(value) {
    this.selectedAreas.push(value[value.length - 1]);
    this.selectedAreas.pop();
    // this.selectedType = value;
    this.isDisabledLot = false;
    this.temp.push(this.dataLot.filter(
      (s) => {
        return s.AreaID === value[value.length - 1].AreaID
      }
    ))

    for (let i = 0; i < this.temp[0].length; i++) {
      this.dataResultLot.push(this.temp[0][i]);
    }
    console.log(this.selectedAreas)
    this.temp = [];
    // console.log(this.dataResultLot)
    console.log(value[value.length - 1])

  }

  public defaultAdmin: { intUserID: number | null; strUserName: string } = {
    intUserID: null,
    strUserName: 'Select Admin',
  };
  public selectedAdmin: { intUserID: number; strUserName: string };

  handleAdminChange(value) {
    console.log(value);
    this.globalAdmin = value;
  }





}

