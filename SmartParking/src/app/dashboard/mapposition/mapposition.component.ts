import { Component, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { LineStyle } from '@progress/kendo-angular-charts';

@Component({
  selector: 'app-mapposition',
  templateUrl: './mapposition.component.html',
  styleUrls: ['./mapposition.component.css']
})
export class MappositionComponent {
  
  public isDisabledLot = true;
  public selectedAreaGlobal: { AreaID: number; AreaName: string };
  public selectedLotGlobal: { LotID: number; LotName: string };
 
  public Master: any[];
  public style: LineStyle = 'smooth';
  public OutTime: number[] = [];
  public TwoWheeler: number[] = [];
  public FourWheeler: number[] = [];


  constructor(private getDashboard: DashboardService) {
    // authServ.LoggedIN()
    //     .subscribe((data: any) => {
    //         console.log("LoggedIN", data)
    //     })
    this.getDashboard.GetHourelyOccupancy()
        .subscribe(data => {
            for (const k in data) {
                this.OutTime.push(data[k]['outtime']);
                this.TwoWheeler.push(data[k]['TwoWheelerOccupancy']);
                this.FourWheeler.push(data[k]['FourWheelerOccupancy']);

            }
            console.log(this.FourWheeler); 

        })
    // this.Master = this.mapItems(router.config);
}
  
  @Output() lotEvent = new EventEmitter();
  
  @Output() areaEvent = new EventEmitter();
  
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
  public dataLot: Array<{ LotID: number; LotName: string; AreaID: number; lat: number; long: number }> = [
    { LotID: 81, LotName: 'Opp City Centre', AreaID: 38, lat: 15.496352, long: 73.833732 },
    { LotID: 82, LotName: 'Opp Dempo Tower', AreaID: 38, lat: 15.495816, long: 73.834264 },
    { LotID: 85, LotName: 'Opp Passport_01', AreaID: 42, lat: 15.495251, long: 73.834701 },
    { LotID: 92, LotName: 'Opp Passport_02', AreaID: 42, lat: 15.495402, long: 73.835090 },
  ];

  public dataResultLot: Array<{ LotID: number; LotName: string; AreaID: number; lat: number; long: number }>;

  public selectedArea: { AreaID: number; AreaName: string };
  public selectedLot: { LotID: number; LotName: string };

  handleAreaChange(value) {

    this.selectedAreaGlobal = value;

    if (value.categoryId === this.defaultArea.AreaID) {
      this.isDisabledLot = true;
      this.dataResultLot = [];
    } else {
      this.isDisabledLot = false;
      this.dataResultLot = this.dataLot.filter(
        (s) => s.AreaID === value.AreaID
      );
    }
    this.areaEvent.emit(this.dataResultLot)
    // console.log(this.dataResultLot)
  }

  handleLotChange(value) {
    this.lotEvent.emit(value);
  }
}
