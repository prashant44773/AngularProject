import { Component, ViewChild, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import H from '@here/maps-api-for-javascript';
@Component({
  selector: 'app-parkingmap',
  templateUrl: './parkingmap.component.html',
  styleUrls: ['./parkingmap.component.css']
})
export class ParkingmapComponent {
  private map?: H.Map;

  public isDisabledLot = true;
  public selectedAreaGlobal: { AreaID: number; AreaName: string };
  public selectedLotGlobal: { LotID: number; LotName: string };

  latitude: number = 15.495816;
  longitude: number = 73.834264;
  zoomM: number = 18;

  @ViewChild('map') mapDiv?: ElementRef;

  title = 'jsapi-angular';

   constructor() {
     this.zoom = 2;
     this.lat = 0;
     this.lng = 0;
   }

   zoom: number;
   lat: number;
   lng: number;

   handleInputChange(event: Event) {
     const target = <HTMLInputElement> event.target;
     if (target) {
       if (target.name === 'zoom') {
         this.zoom = parseFloat(target.value);
       }
       if (target.name === 'lat') {
         this.lat = parseFloat(target.value);
       }
       if (target.name === 'lng') {
         this.lng = parseFloat(target.value);
       }
     }
   }





  ngAfterViewInit(): void {
    if ((this.mapDiv)) {
      alert(1)
      const platform = new H.service.Platform({
        apikey: '9Qgqny5wuEq59alMz40HMDuDgkbVPRGeY7U_v5Tpr9s'
      });
      const layers = platform.createDefaultLayers();
      console.log(layers)
      const map = new H.Map(
        this.mapDiv.nativeElement,
        (layers as any).raster.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: { lat: this.latitude, lng: this.longitude },
          zoom: this.zoomM,
        },
      );

      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Enable dynamic resizing of the map, based on the current size of the enclosing cntainer
      window.addEventListener('resize', () => map.getViewPort().resize());

      // Create the default UI:
      var ui = H.ui.UI.createDefault(map, layers,);
      this.map = map;

      const marker = new H.map.Marker({ lat: this.latitude, lng: this.longitude });

      // marker.setData('Opp Dempo Tower');
      map.addObject(marker);
      var bubble = new H.ui.InfoBubble({ lng: this.longitude, lat: this.latitude }, {
        content: '<b>Hello World!</b>'
      });
      ui.addBubble(bubble);
    }
    // if (!this.map && this.mapDiv) {

    //   const platform = new H.service.Platform({
    //     apikey: '9Qgqny5wuEq59alMz40HMDuDgkbVPRGeY7U_v5Tpr9s'
    //   });
    //   const layers = platform.createDefaultLayers();
    //   console.log(layers)
    //   const map = new H.Map(
    //     this.mapDiv.nativeElement,
    //     (layers as any).raster.satellite
    //     .map,
    //     {
    //       pixelRatio: window.devicePixelRatio,
    //       center: {lat: 15.495402, lng: 73.835090},
    //       zoom: this.zoomM,
    //     },
    //   );
    //   this.map = map;

    //   const marker = new H.map.Marker({ lat: 15.495402, lng: 73.835090 });

    //   marker.setData('Opp Dempo Tower');
    //   map.addObject(marker);
    // }
  }
  
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
  }

  handleLotChange(value) {
    console.log(value);
    console.log(value.lat);
    console.log(value.long);
    this.latitude = value.lat;
    this.longitude = value.long;
    this.selectedLotGlobal = value;


  }

}