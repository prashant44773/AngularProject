import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  AddEvent,
  RemoveEvent,
  CancelEvent,
  SaveEvent,
  EditEvent,
} from '@progress/kendo-angular-grid';
import { VehicleTypeService } from './vehicle-type.service';
import {Vehicle} from './Vehicle';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css'],
})
export class VehicleTypeComponent {
  AddNewRow = false;

  VehicleTypeMasterGet: any;

  constructor(private VehicleTypeMaster: VehicleTypeService) {
    this.VehicleTypeMaster.VehicleTypeMasterGet().subscribe((res: any) => {
      this.VehicleTypeMasterGet = res;
      console.log(this.VehicleTypeMasterGet);
    });
  }

  ReloadApi() {
    // Calling the Get Method AGAIN
    this.VehicleTypeMaster.VehicleTypeMasterGet().subscribe((res: any) => {
      this.VehicleTypeMasterGet = res;
      console.log(this.VehicleTypeMasterGet);
    });
  }

  // CRUD in Kendo-Grid

  protected editHandler(args: EditEvent): void {
    const group = new FormGroup({
      intVehicleTypeID: new FormControl(args.dataItem.intVehicleTypeID),
      strVehicleType: new FormControl(args.dataItem.strVehicleType),
      intMinimumFare: new FormControl(args.dataItem.intMinimumFare)
      // other fields
    });

    args.sender.editRow(args.rowIndex, group);
  }

  public saveHandler(args: SaveEvent): void {
    if (this.AddNewRow) {
      // alert('Saving the New Row');

      const bodyAddRow: Vehicle = args.formGroup.value;

      // console.log(bodyAddRow);

      args.sender.closeRow(args.rowIndex);

      this.VehicleTypeMaster.VehicleTypeMasterAdd(bodyAddRow).subscribe(
        (res) => {
          console.log(res);
          // Reload Api
          this.ReloadApi();
        }
      );

      this.AddNewRow = false;
    } else {
      // my if else logic
      args.sender.closeRow(args.rowIndex);

      const bodyEdit: Vehicle = args.formGroup.value;

      // console.log(bodyEdit);

      this.VehicleTypeMaster.VehicleTypeMasterEdit(bodyEdit).subscribe(
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
    const bodyDel: Vehicle = args.dataItem;
    // console.log(bodyDel);
    this.VehicleTypeMaster.VehicleTypeMasterDel(bodyDel).subscribe((res) => {
      console.log(res);
      // Reload Api
      this.ReloadApi();
    });
  }

  public addHandler(args: AddEvent): void {
    const group = new FormGroup({
      strVehicleType: new FormControl(),
      intMinimumFare: new FormControl()
    });

    args.sender.addRow(group);

    this.AddNewRow = true;
  }

  Action(dataItem) {
    const bodyActivate: Vehicle = dataItem;
    // console.log(bodyActivate);
    this.VehicleTypeMaster.VehicleTypeMasterActive(bodyActivate).subscribe(
      (res) => {
        console.log(res);
        this.ReloadApi();
      }
    );
  }
}
