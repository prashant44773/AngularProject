import { Component, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';

import H, { ui } from '@here/maps-api-for-javascript';
import { map } from '@progress/kendo-data-query/dist/npm/transducers';
import { logEvent } from 'firebase/analytics';
@Component({
  selector: 'app-jsmap',
  templateUrl: './jsmap.component.html',
  styleUrls: ['./jsmap.component.css']
})
export class JsmapComponent {

  latitude: number = 15.495816;
  longitude: number = 73.834264;
  zoomM: number = 18;
  private map?: H.Map;
  private ui : any;
  
  public curDate:string ='';
  public curTime:string ='';
  public selectedLotName:string = '';
   cDate = new Date();
  @ViewChild('map') mapDiv?: ElementRef;

  @Input() public zoom = 2;
  @Input() public lat = 0;
  @Input() public lng = 0;

  @Input() public obj = {};
  constructor() {
  }
  areaFunction(e) {
    this.curDate = this.cDate.toLocaleDateString();
    this.curTime = this.cDate.toLocaleTimeString();
    this.selectedLotName = '';
    if (this.map) {

      this.map.removeObjects(this.map.getObjects());

      for (let t in e) {
        this.ui.addBubble(new H.ui.InfoBubble({ lat: e[t].lat+0.0001, lng: e[t].long-0.0001 }, {
          content: e[t].LotName
        }));
        this.selectedLotName += e[t].LotName+" & ";
        this.map.setZoom(18);
        this.map.setCenter({ lat: e[t].lat, lng: e[t].long });
        this.map.addObject(new H.map.Marker({ lat: e[t].lat, lng: e[t].long }));
      }
      this.selectedLotName = this.selectedLotName.slice(0,this.selectedLotName.length-2)
    }
    console.log(e);
  }
  lotFunction(e) {
    this.selectedLotName = e.LotName;
    this.curDate = this.cDate.toLocaleDateString();
    this.curTime = this.cDate.toLocaleTimeString();
    
    console.log(e);

    if (this.map) {
      console.log(this.map)

      

      this.map.removeObjects(this.map.getObjects());
      
      this.map.setZoom(18);

      this.map.setCenter({ lat: e.lat, lng: e.long });

      this.map.addObject(new H.map.Marker({ lat: e.lat, lng: e.long }))
      this.ui.addBubble(new H.ui.InfoBubble({ lat: e.lat+0.0001, lng: e.long-0.0001 }, {
        content: e.LotName
      }));
    }
  }
  ngAfterViewInit(): void {
    
    this.curDate = this.cDate.toLocaleDateString();
    this.curTime = this.cDate.toLocaleTimeString();
    this.selectedLotName = 'Opp Dempo Tower';
    if ((this.mapDiv)) {

      const platform = new H.service.Platform({
        apikey: '9Qgqny5wuEq59alMz40HMDuDgkbVPRGeY7U_v5Tpr9s'
      });
      const layers = platform.createDefaultLayers();

      const map = new H.Map(
        this.mapDiv.nativeElement,
        (layers as any).raster.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: { lat: this.latitude, lng: this.longitude },
          zoom: this.zoomM,
        },
      );
      this.ui = H.ui.UI.createDefault(map, layers, 'de-DE')
      // Create an info bubble object at a specific geographic location:
      var bubble = new H.ui.InfoBubble({ lat: this.latitude+0.0001, lng: this.longitude-0.0001 }, {
        content: 'Opp Dempo Tower'
      });

      // Add info bubble to the UI:
      this.ui.addBubble(bubble);
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


      window.addEventListener('resize', () => map.getViewPort().resize());
      const marker = new H.map.Marker({ lat: this.latitude, lng: this.longitude })

      this.map = map;
      console.log(this.map)
      map.addObject(marker);
      

    }

  }
}
