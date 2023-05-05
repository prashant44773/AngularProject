import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddEvent, RemoveEvent, CancelEvent, SaveEvent, EditEvent } from '@progress/kendo-angular-grid';
import { ListModelForDropdown } from './ListModel';
import {UserTypeService} from './user-type.service'
import {UserTy} from './UserType'


@Component({
  selector: 'app-user-type-master',
  templateUrl: './user-type-master.component.html',
  styleUrls: ['./user-type-master.component.css']
})
export class UserTypeMasterComponent {
  AddNewRow = false;

  UserTypeMasterGet: any;

  AgencyList: ListModelForDropdown[] = [];

  UserTypeList: ListModelForDropdown[] = [];

  obj: ListModelForDropdown;

  AgencyValueDropdown: any;
  UserValueDropdown: any;

  ChangedVlaueofAllowModifications:any;

  DefaultValueofAddNewRow = true;


  constructor(private UserTypeMaster: UserTypeService) {
    this.UserTypeMaster.UserTypeMasterGet().subscribe((res: any) => {
      this.UserTypeMasterGet = res;
      console.log(this.UserTypeMasterGet);
    });
  }

  ReloadApi() {
    // Calling the Get Method AGAIN
    this.UserTypeMaster.UserTypeMasterGet().subscribe((res: any) => {
      this.UserTypeMasterGet = res;
      console.log(this.UserTypeMasterGet);
    });
  }

  ResetVariables() {
    // Reset this Values
    this.AgencyValueDropdown = null;
    this.UserValueDropdown = null;
    this.UserTypeList = [];
    this.AgencyList = [];
    this.ChangedVlaueofAllowModifications = null;
  }

  // CRUD in Kendo-Grid

  protected editHandler(args: EditEvent): void {
    // this.GetDropdownLists(); // Get Data For the DropDown Lists in Grid

    const group = new FormGroup({
      intUserTypeID: new FormControl(args.dataItem.intUserTypeID),
      strUserType: new FormControl(args.dataItem.strUserType),
      bAllowModifications: new FormControl(args.dataItem.bAllowModifications),
      bAllowforWeb: new FormControl(args.dataItem.bAllowforWeb),
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

      const bodyAddRow: UserTy = args.formGroup.value;

      // Dummy Values For Api
      bodyAddRow.dteModifiedOn = new Date();
      bodyAddRow.bActive = false;
      bodyAddRow.bDeleted = false;
      bodyAddRow.bAllowforWeb = false;
      bodyAddRow.intUserTypeID = 0;
      // Dummy Values For Api

      console.log(bodyAddRow);

      args.sender.closeRow(args.rowIndex);

      this.UserTypeMaster.UserTypeMasterAdd(bodyAddRow).subscribe(
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
      // alert("Saving the Edits");
      args.sender.closeRow(args.rowIndex);

      const bodyEdit: UserTy = args.formGroup.value;

      if(this.ChangedVlaueofAllowModifications != null){
        // alert("Not Null");
        bodyEdit.bAllowModifications = this.ChangedVlaueofAllowModifications;
      }
      else{
        // alert("Value is Null");
      }


      console.log(bodyEdit);

      this.UserTypeMaster.UserTypeMasterEdit(bodyEdit).subscribe(
        (res: any) => {
          console.log(res);

          // Reload Api
          this.ReloadApi();

          // Reset this Values
          this.ResetVariables();
        }
      );
      // Reset this Values
      // this.ResetVariables();
    }
  }

  public cancelHandler(args: CancelEvent): void {
    // Reset this Values
    this.ResetVariables();

    // close the editor for the given row
    args.sender.closeRow(args.rowIndex);
  }

  public removeHandler(args: RemoveEvent): void {
    const bodyDel: UserTy = args.dataItem;
    console.log(bodyDel);
    this.UserTypeMaster.UserTypeMasterDel(bodyDel).subscribe((res) => {
      console.log(res);
      // Reload Api
      this.ReloadApi();
    });
  }

  public addHandler(args: AddEvent): void {
    // this.GetDropdownLists();

    const group = new FormGroup({
      intUserTypeID: new FormControl(),
      strUserType: new FormControl(),
      bAllowModifications: new FormControl(this.DefaultValueofAddNewRow),
      bAllowforWeb: new FormControl(),
      dteModifiedOn: new FormControl(),
      bActive: new FormControl(),
      bDeleted: new FormControl()
    });

    args.sender.addRow(group);

    this.AddNewRow = true;
  }

  Action(dataItem) {
    const bodyActivate: UserTy = dataItem;
    console.log(bodyActivate);
    this.UserTypeMaster.UserTypeMasterActive(bodyActivate).subscribe(
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

  AllowModificatios(data){
      // alert("Toggle Allow Button");
      this.Toggle(data.bAllowModifications);
      data.bAllowModifications = this.ChangedVlaueofAllowModifications;

      const bodyAllowModifications: UserTy = data;

      // console.log(bodyAllowModifications);

      this.UserTypeMaster.UserTypeMasterEdit(bodyAllowModifications).subscribe(
        (res: any) => {
          console.log(res);

          // Reload Api
          this.ReloadApi();

          // Reset this Values
          // this.ResetVariables();
        }
      );
  }

  Toggle(data){
    // console.log(data);
    if(data){
      this.ChangedVlaueofAllowModifications = false;
    }else{
      this.ChangedVlaueofAllowModifications = true;
    }
    // console.log(this.ChangedVlaueofAllowModifications);
  }


  ToggleForAddRow(dataItems){
    alert("Toggle Values");
    // console.log(data);
    if(dataItems.bAllowModifications){
      this.DefaultValueofAddNewRow = false;
    }else{
      this.DefaultValueofAddNewRow = true;
    }
    // console.log(this.DefaultValueofAddNewRow);
  }


}
