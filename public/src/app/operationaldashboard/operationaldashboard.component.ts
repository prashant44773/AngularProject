import { Component } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { OPERATIONS, SHOWPARK, PARKING } from './operationsModel';

import { OperationsService } from './operations.service';

import { FormGroup, FormControl } from '@angular/forms';
import { AddEvent, CancelEvent, EditEvent, RemoveEvent, SaveEvent, GridComponent } from '@progress/kendo-angular-grid';
import { temp } from '../masterconfig/devicemaster/model';

@Component({
  selector: 'app-operationaldashboard',
  templateUrl: './operationaldashboard.component.html',
  styleUrls: ['./operationaldashboard.component.css']
})
export class OperationaldashboardComponent {
  Areadata: any = [];
  ParkingData: PARKING[] = [];

  ParkingShow: SHOWPARK[] = [];
  AreaShow: SHOWPARK[] = []

  public DateinString: String = "";
  public value: Date = new Date();
  public max: Date = new Date();

  constructor(private getOperation: OperationsService) {
    this.getOperation.GetArea(this.DateinString)
      .subscribe(data => {
        this.Areadata = data;
        for (let x in data) {
          this.AreaShow.push({ AreaID: data[x].intAreaID, show: true })
          this.ParkingShow.push({ AreaID: data[x].intAreaID, show: false });

          this.ParkingShow.push();
          this.getOperation.GetParking(data[x].intAreaID, this.DateinString)
            .subscribe(parkdata => {
              for (let t in parkdata) {

                parkdata[t].intAreaID = data[x].intAreaID;
                this.ParkingData.push(parkdata[t]);
              }
            })
        }
      })

  }

  //readmore variable, its true than read more string will print
  ReadMore: boolean = true;

  //hiding info box
  visible: boolean = false;

  //onclick toggling both
  Dropdown: boolean = true;
  Dropup: boolean = false;

  DropDownupdown(areaId) {
    for (let area in this.ParkingShow) {
      if (this.ParkingShow[area].AreaID == areaId) {
        this.ParkingShow[area].show = !this.ParkingShow[area].show;
      }
    }
    console.log(this.ParkingShow)
    this.Dropdown = !this.Dropdown;
    this.Dropup = !this.Dropup;
  }

  public defaultArea: { AreaID: number | null; AreaName: string } = {
    AreaID: null,
    AreaName: 'Select Area',
  };
  public dataArea: Array<{ AreaID: number; AreaName: string }> = [
    { AreaID: 38, AreaName: 'Patto' },
    { AreaID: 42, AreaName: 'Passport' },
    { AreaID: 48, AreaName: 'Library' },
    { AreaID: 49, AreaName: 'KTC' },
    { AreaID: 50, AreaName: 'Dempo' },
    { AreaID: 54, AreaName: 'My Area' },
    { AreaID: 55, AreaName: 'Panaji Area' },

  ];
  public selectedArea: { AreaID: number; AreaName: string };
  handleAreaChange(value) {
    if (value.AreaID == null) {
      for (let areaChange in this.AreaShow) {
        this.AreaShow[areaChange].show = true;
      }
    }
    else {
      for (let areaChange in this.AreaShow) {
        if (value.AreaID != this.AreaShow[areaChange].AreaID) {
          this.AreaShow[areaChange].show = false;
        }
        else if (value.AreaID == this.AreaShow[areaChange].AreaID) {
          this.AreaShow[areaChange].show = true;
        }
      }
    }
    console.log(value.AreaID);
    console.log(this.AreaShow)
  }

  public onDateChange(value: any): void {
    var mnth = ('0' + (value.getMonth() + 1)).slice(-2),
      day = ('0' + value.getDate()).slice(-2);
    this.DateinString = [ day,mnth, value.getFullYear()].join('/');
    console.log(this.DateinString);

    this.Areadata = [];
    this.ParkingData = [];

    this.ParkingShow = [];
    this.AreaShow = []
  
    this.getOperation.GetArea(this.DateinString)
      .subscribe(data => {
        this.Areadata = data;
        for (let x in data) {
          this.AreaShow.push({ AreaID: data[x].intAreaID, show: true })
          this.ParkingShow.push({ AreaID: data[x].intAreaID, show: false });

          this.ParkingShow.push();
          this.getOperation.GetParking(data[x].intAreaID, this.DateinString)
            .subscribe(parkdata => {
              for (let t in parkdata) {

                parkdata[t].intAreaID = data[x].intAreaID;
                this.ParkingData.push(parkdata[t]);
              }
            })
        }
      })

  }
}
