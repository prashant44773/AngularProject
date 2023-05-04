import { Component } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { PASS } from './passdetailsmodel'
import { PassdetailsService } from './passdetails.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AddEvent, CancelEvent, EditEvent, RemoveEvent, SaveEvent, GridComponent } from '@progress/kendo-angular-grid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passdetailsmaster',
  templateUrl: './passdetailsmaster.component.html',
  styleUrls: ['./passdetailsmaster.component.css']
})
export class PassdetailsmasterComponent{
  public formGroup: FormGroup;
  private editedRowIndex: number;
  public gridData: any;
  public selectedTypeGlobal: { vehicleTypeID: number; vehicleType: string }={
    vehicleTypeID:0,vehicleType:""
  }
  public selectedAreaGlobal: { AreaID: number ; AreaName: string }={
    AreaID:0,AreaName:""
  };

  public printUserID: Number ;
  constructor(private router: Router, private getPassdata: PassdetailsService) {
    this.getPassdata.GetPassData()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
      
  }
  
  public onStateChange(): void {
    this.getPassdata.GetPassData()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({
      intPassID: new FormControl(),
      strOwnerName: new FormControl(),
      strOwnerAddress: new FormControl(),
      strOwnerMobileNo: new FormControl(),
      strVehicleregNo: new FormControl(),
      strvehicleMakeModel: new FormControl(),
      intVehicletype: new FormControl(),
      strVehicleType_name: new FormControl(),
      dtepassvalidfrom: new FormControl(),
      dtepassvalidTo: new FormControl(),
      strpassvalidity: new FormControl(),
      intParkingArea: new FormControl(),
      strParkingArea: new FormControl(),
      decTotalpayableAmount: new FormControl(),
      PassIssuedatetime: new FormControl(),
      LastUpdateddatetime: new FormControl(),
      Status: new FormControl(),
      passNo: new FormControl(),

    });

    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }
  public editHandler(args: EditEvent): void {
    const { dataItem } = args;
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      intPassID: new FormControl(dataItem.intPassID),
      strOwnerName: new FormControl(dataItem.strOwnerName),
      strOwnerAddress: new FormControl(dataItem.strOwnerAddress),
      strOwnerMobileNo: new FormControl(dataItem.strOwnerMobileNo),
      strVehicleregNo: new FormControl(dataItem.strVehicleregNo),
      strvehicleMakeModel: new FormControl(dataItem.strvehicleMakeModel),
      intVehicletype: new FormControl(dataItem.intVehicletype),
      strVehicleType_name: new FormControl(dataItem.strVehicleType_name),
      dtepassvalidfrom: new FormControl(dataItem.dtepassvalidfrom),
      dtepassvalidTo: new FormControl(dataItem.dtepassvalidTo),
      strpassvalidity: new FormControl(dataItem.strpassvalidity),
      intParkingArea: new FormControl(dataItem.intParkingArea),
      strParkingArea: new FormControl(dataItem.strParkingArea),
      decTotalpayableAmount: new FormControl(dataItem.decTotalpayableAmount),
      PassIssuedatetime: new FormControl(dataItem.PassIssuedatetime),
      LastUpdateddatetime: new FormControl(dataItem.LastUpdateddatetime),
      Status: new FormControl(dataItem.Status),
      passNo: new FormControl(dataItem.passNo)      
    });
    this.editedRowIndex = args.rowIndex;
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public cancelHandler(args: CancelEvent): void {
    this.closeEditor(args.sender, args.rowIndex);
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const devicedata: PASS = formGroup.value;
    if (devicedata.intPassID == null) {
      devicedata.intPassID = 0;
      
      devicedata.passNo = "";//No idea
    }

    devicedata.intParkingArea = this.selectedAreaGlobal.AreaID; //From DropDown
    devicedata.strParkingArea = this.selectedAreaGlobal.AreaName; //From DropDown
    devicedata.intVehicletype = this.selectedTypeGlobal.vehicleTypeID; //From DropDown
    devicedata.strVehicleType_name = this.selectedTypeGlobal.vehicleType;
    console.log(devicedata);
    this.getPassdata.PassDataUpdate(devicedata)
      .subscribe((data: any) => {
        const re = data;
        this.onStateChange();
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

    this.getPassdata.PassDataDelete(args.dataItem)
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
  public ActivateDeActivate(dataItem) {
    
    this.getPassdata.PassDataStatus(dataItem)
      .subscribe((data: any) => {
        const re = data;
        this.onStateChange();
      },
        (error: any) => {
          console.log(error.error.message);
        }
      );
  }
  public defaultVehicleType: { vehicleTypeID: number | null; vehicleType: string } = {
    vehicleTypeID: null,
    vehicleType: 'Select Vehicle Type',
  };

  public dataVehicle: Array<{ vehicleTypeID: number; vehicleType: string }> = [
    { vehicleTypeID: 1, vehicleType: '2 Wheeler' },
    { vehicleTypeID: 3, vehicleType: '4 Wheeler' },
  ];
  public selectedType: { vehicleTypeID: number; vehicleType: string };

  handleCategoryChange(value) {
    this.selectedType = value;
    this.selectedTypeGlobal = value;
  }
  //Area DropDown
  public defaultArea: { AreaID: number | null; AreaName: string } = {
    AreaID: null,
    AreaName: 'Select Area',
  };

  public dataArea: Array<{ AreaID: number ; AreaName: string }> = [
    { AreaID: 38 , AreaName: 'Patto'  },
    { AreaID: 42 , AreaName: 'Passport'  },    
  ];
  public selectedArea: { AreaID: number ; AreaName: string };

  handleAreaChange(value) {
    this.selectedType = value;
    this.selectedAreaGlobal = value;

    
  }

  printP(id){
    this.printUserID = id.intPassID;
    console.log(this.printUserID)
    window.open('/printpass')
    
  }
  public showDetails(item) {
    this.printUserID = item.intPassID;
    
    //console.log(item);
    this.router.navigateByUrl('/printpass', { state: { id: this.printUserID }});
    //window.open('/printpass');
  }


}
