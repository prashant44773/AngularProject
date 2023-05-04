import { Component } from '@angular/core';
import {UserMasterService} from './user-master.service'
import { User } from './UserMaster';
import { SaveEvent, EditEvent, CancelEvent, RemoveEvent, AddEvent } from '@progress/kendo-angular-grid';
import { FormControl, FormGroup } from '@angular/forms';
import { ListModelForDropdown } from './ListModel';


@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent {
  AddNewRow = false;

  UserMasterGet: any;

  AgencyList: ListModelForDropdown[] = [];

  UserTypeList: ListModelForDropdown[] = [];

  obj: ListModelForDropdown;

  AgencyValueDropdown: any;
  UserValueDropdown: any;

  constructor(private UserMaster: UserMasterService) {
    this.UserMaster.UserMasterGet().subscribe((res: any) => {
      this.UserMasterGet = res;
      console.log(this.UserMasterGet);
    });
  }

  ReloadApi() {
    // Calling the Get Method AGAIN
    this.UserMaster.UserMasterGet().subscribe((res: any) => {
      this.UserMasterGet = res;
      console.log(this.UserMasterGet);
    });
  }

  ResetVariables() {
    // Reset this Values
    this.AgencyValueDropdown = null;
    this.UserValueDropdown = null;
    this.UserTypeList = [];
    this.AgencyList = [];
  }

  GetDropdownLists() {
    let Agency;
    let UserType;

    this.UserMaster.GetAgencyNames().subscribe((res) => {
      Agency = res;
      // console.log(city);

      Agency.forEach((element) => {
        this.obj = {
          id: element.intAgencyID,
          name: element.strAgencyName,
        };

        this.AgencyList.push(this.obj);
      });
    });
    console.log(this.AgencyList);

    this.UserMaster.GetUserTypeNames().subscribe((res) => {
      UserType = res;
      // console.log(area);

      UserType.forEach((element) => {
        this.obj = {
          id: element.intUserTypeID,
          name: element.strUserType,
        };
        this.UserTypeList.push(this.obj);
      });
    });
    console.log(this.UserTypeList);
  }

  // CRUD in Kendo-Grid

  protected editHandler(args: EditEvent): void {
    this.GetDropdownLists(); // Get Data For the DropDown Lists in Grid

    const group = new FormGroup({
      intUserID: new FormControl(args.dataItem.intUserID),
      strUserName: new FormControl(args.dataItem.strUserName),
      intUserTypeID: new FormControl(args.dataItem.intUserTypeID),
      strEmail: new FormControl(args.dataItem.strEmail),
      strUserType: new FormControl(args.dataItem.strUserType),
      strFullName: new FormControl(args.dataItem.strFullName),
      strPassword: new FormControl(args.dataItem.strPassword),
      strMobileNo: new FormControl(args.dataItem.strMobileNo),
      intAgencyID: new FormControl(args.dataItem.intAgencyID),
      strAgencyName: new FormControl(args.dataItem.strAgencyName),
      intRoleID: new FormControl(args.dataItem.intRoleID),
      strRoleName: new FormControl(args.dataItem.strRoleName),
      dteModifiedOn: new FormControl(args.dataItem.dteModifiedOn),
      bActive: new FormControl(args.dataItem.bActive),
      bDeleted: new FormControl(args.dataItem.bDeleted)
      // other fields
    });

    args.sender.editRow(args.rowIndex, group);
  }

  public saveHandler(args: SaveEvent): void {
    if (this.AddNewRow) {
      // this.GetDropdownLists(); // Get Data For the DropDown Lists in Grid
      // alert('Saving the New Row');

      const bodyAddRow: User = args.formGroup.value;

      bodyAddRow.intAgencyID = this.AgencyValueDropdown.id;
      bodyAddRow.strAgencyName = this.AgencyValueDropdown.name;

      bodyAddRow.intUserTypeID = this.UserValueDropdown.id;
      bodyAddRow.strUserType = this.UserValueDropdown.name;

      // Dummy Values For Api
      bodyAddRow.dteModifiedOn = new Date();
      bodyAddRow.bActive = false;
      bodyAddRow.bDeleted = false;
      bodyAddRow.intRoleID = 0;
      bodyAddRow.intUserID = 0;
      bodyAddRow.strFullName = "false";
      bodyAddRow.strRoleName = "false";
      // Dummy Values For Api

      // Default Values For Api
      bodyAddRow.strPassword = "Password";
      // Default Values For Api

      console.log(bodyAddRow);

      args.sender.closeRow(args.rowIndex);

      this.UserMaster.UserMasterAdd(bodyAddRow).subscribe(
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
      alert("Saving the Edits");
      args.sender.closeRow(args.rowIndex);

      const bodyEdit: User = args.formGroup.value;

      bodyEdit.intAgencyID = this.AgencyValueDropdown.id;
      bodyEdit.strAgencyName = this.AgencyValueDropdown.name;

      bodyEdit.intUserTypeID = this.UserValueDropdown.id;
      bodyEdit.strUserType = this.UserValueDropdown.name;

      console.log(bodyEdit);

      this.UserMaster.UserMasterEdit(bodyEdit).subscribe(
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
    const bodyDel: User = args.dataItem;
    console.log(bodyDel);
    this.UserMaster.UserMasterDel(bodyDel).subscribe((res) => {
      console.log(res);
      // Reload Api
      this.ReloadApi();
    });
  }

  public addHandler(args: AddEvent): void {
    this.GetDropdownLists();

    const group = new FormGroup({
      intUserID: new FormControl(),
      strUserName: new FormControl(),
      intUserTypeID: new FormControl(),
      strEmail: new FormControl(),
      strUserType: new FormControl(),
      strFullName: new FormControl(),
      strPassword: new FormControl(),
      strMobileNo: new FormControl(),
      intAgencyID: new FormControl(),
      strAgencyName: new FormControl(),
      intRoleID: new FormControl(),
      strRoleName: new FormControl(),
      dteModifiedOn: new FormControl(),
      bActive: new FormControl(),
      bDeleted: new FormControl(),
    });

    args.sender.addRow(group);

    this.AddNewRow = true;
  }

  Action(dataItem) {
    const bodyActivate: User = dataItem;
    console.log(bodyActivate);
    this.UserMaster.UserMasterActive(bodyActivate).subscribe(
      (res) => {
        console.log(res);
        this.ReloadApi();
      }
    );
  }

  AgencyValueFromDropdown(value) {
    this.AgencyValueDropdown = value;
  }

  UserValueFromDropdown(value) {
    this.UserValueDropdown = value;
  }
}
