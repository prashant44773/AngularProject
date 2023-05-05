import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddEvent, RemoveEvent, CancelEvent, SaveEvent, EditEvent } from '@progress/kendo-angular-grid';
import { ListModelForDropdown } from './ListModel';
import {AgencyMasterService} from './agency-master.service'
import {Agent} from './Agency';

@Component({
  selector: 'app-agency-master',
  templateUrl: './agency-master.component.html',
  styleUrls: ['./agency-master.component.css']
})
export class AgencyMasterComponent {
  AddNewRow = false;

  AgencyMasterGet: any;

  constructor(private AgencyMaster: AgencyMasterService) {
    this.AgencyMaster.AgencyMasterGet().subscribe((res: any) => {
      this.AgencyMasterGet = res;
      console.log(this.AgencyMasterGet);
    });
  }

  ReloadApi() {
    // Calling the Get Method AGAIN
    this.AgencyMaster.AgencyMasterGet().subscribe((res: any) => {
      this.AgencyMasterGet = res;
      console.log(this.AgencyMasterGet);
    });
  }



  // CRUD in Kendo-Grid

  protected editHandler(args: EditEvent): void {

    const group = new FormGroup({
      intAgencyID: new FormControl(args.dataItem.intAgencyID),
      strAgencyName: new FormControl(args.dataItem.strAgencyName),
      intParkingLotID: new FormControl(args.dataItem.intParkingLotID),
      strParkingLotName: new FormControl(args.dataItem.strParkingLotName),
      dteContractStartDate: new FormControl(args.dataItem.dteContractStartDate),
      strContractStartDate: new FormControl(args.dataItem.strContractStartDate),
      strContractEndDate: new FormControl(args.dataItem.strContractEndDate),
      dteContractEndDate: new FormControl(args.dataItem.dteContractEndDate),
      strMobileNo: new FormControl(args.dataItem.strMobileNo),
      strEmail: new FormControl(args.dataItem.strEmail),
      strRemarks: new FormControl(args.dataItem.strRemarks),
      strContactPersonName: new FormControl(args.dataItem.strContactPersonName),
      dteModifiedOn: new FormControl(args.dataItem.dteModifiedOn),
      bActive: new FormControl(args.dataItem.bActive),
      bDeleted: new FormControl(args.dataItem.bDeleted),
      // other fields
    });

    args.sender.editRow(args.rowIndex, group);
  }

  public saveHandler(args: SaveEvent): void {
    if (this.AddNewRow) {
      // alert('Saving the New Row');

      const bodyAddRow: Agent = args.formGroup.value;

      // Dummmy Values

      bodyAddRow.intAgencyID = 0;
      bodyAddRow.intParkingLotID = 0;
      bodyAddRow.strParkingLotName = "random";
      bodyAddRow.dteContractStartDate = new Date();
      bodyAddRow.dteContractEndDate = new Date();
      bodyAddRow.dteModifiedOn = new Date();
      bodyAddRow.bActive = false;
      bodyAddRow.bDeleted = false;
      // Dummmy Values

      console.log(bodyAddRow);

      args.sender.closeRow(args.rowIndex);

      this.AgencyMaster.AgencyMasterAdd(bodyAddRow).subscribe(
        (res) => {
          console.log(res);
          // Reload Api
          this.ReloadApi();
        }
      );

      this.AddNewRow = false;
    } else {
      // my if else logic
      // alert("Saving the Edits");
      args.sender.closeRow(args.rowIndex);

      const bodyEdit: Agent = args.formGroup.value;

      console.log(bodyEdit);

      this.AgencyMaster.AgencyMasterEdit(bodyEdit).subscribe(
        (res: any) => {
          console.log(res);

          // Reload Api
          this.ReloadApi();
        }
      );
    }
  }

  public cancelHandler(args: CancelEvent): void {

    // close the editor for the given row
    args.sender.closeRow(args.rowIndex);
  }

  public removeHandler(args: RemoveEvent): void {
    const bodyDel: Agent = args.dataItem;
    this.AgencyMaster.AgencyMasterDel(bodyDel).subscribe((res) => {
      console.log(res);
      // Reload Api
      this.ReloadApi();
    });
  }

  public addHandler(args: AddEvent): void {

    const group = new FormGroup({
      intAgencyID: new FormControl(),
      strAgencyName: new FormControl(),
      intParkingLotID: new FormControl(),
      strParkingLotName: new FormControl(),
      dteContractStartDate: new FormControl(),
      strContractStartDate: new FormControl(),
      strContractEndDate: new FormControl(),
      dteContractEndDate: new FormControl(),
      strMobileNo: new FormControl(),
      strEmail: new FormControl(),
      strRemarks: new FormControl(),
      strContactPersonName: new FormControl(),
      dteModifiedOn: new FormControl(),
      bActive: new FormControl(),
      bDeleted: new FormControl(),
    });

    args.sender.addRow(group);

    this.AddNewRow = true;
  }

  Action(dataItem) {
    const bodyActivate: Agent = dataItem;
    // console.log(bodyActivate);
    this.AgencyMaster.AgencyMasterActive(bodyActivate).subscribe(
      (res) => {
        console.log(res);
        this.ReloadApi();
      }
    );
  }

}
