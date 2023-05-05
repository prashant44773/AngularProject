import { Component } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { FormGroup, FormControl } from '@angular/forms';
import { SettingService } from './setting.service'
import { AddEvent, CancelEvent, EditEvent, RemoveEvent, SaveEvent, GridComponent } from '@progress/kendo-angular-grid';
import { SETTING } from './settingmodel';

@Component({
  selector: 'app-settingmaster',
  templateUrl: './settingmaster.component.html',
  styleUrls: ['./settingmaster.component.css']
})
export class SettingmasterComponent {
  public formGroup: FormGroup;
  private editedRowIndex: number;
  public gridData: any;

  constructor(private getService: SettingService) {
    this.getService.GetService()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
  }


  public onStateChange(state: State): void {
    this.getService.GetService()
      .subscribe(data => {
        this.gridData = [data].pop();
      })
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({


      intSettingID: new FormControl(),
      strSettingKey: new FormControl(),
      strSettingValue: new FormControl(),
      strDescription: new FormControl(),
      bActive: new FormControl(),

    });

    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }
  public editHandler(args: EditEvent): void {
    const { dataItem } = args;
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      intSettingID: new FormControl(dataItem.intSettingID),
      strSettingKey: new FormControl(dataItem.strSettingKey),
      strSettingValue: new FormControl(dataItem.strSettingValue),
      strDescription: new FormControl(dataItem.strDescription),
      bActive: new FormControl(dataItem.bActive),

      
    });
    
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    this.closeEditor(args.sender, args.rowIndex);
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const devicedata: SETTING = formGroup.value;
    console.log(devicedata);
    if (devicedata.intSettingID == null) {
      devicedata.intSettingID = 0;
      devicedata.bActive = true;
      
    }
    console.log(devicedata);
    this.getService.SettingUpdate(devicedata)
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

    this.getService.SettingDelete(args.dataItem)
      .subscribe((data: any) => {
        const re = data;
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
    
    this.getService.SettingStatus(dataItem)
      .subscribe((data: any) => {
        const re = data;
      },
        (error: any) => {
          console.log(error.error.message);
        }
      );
  }


}
