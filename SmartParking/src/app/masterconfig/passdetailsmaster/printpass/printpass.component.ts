import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrintpassService} from './printpass.service'
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
@Component({
  selector: 'app-printpass',
  templateUrl: './printpass.component.html',
  styleUrls: ['./printpass.component.css']
})
export class PrintpassComponent  {
  public printID: any
  public PrintPassDetails: any;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';
  constructor(private router: Router, private getPassDetails: PrintpassService){
    // console.log(this.router.getCurrentNavigation().extras.state);
    this.getPassDetails.GetPassData( history.state.id)
      .subscribe(data => {
        this.PrintPassDetails = data[0];
        console.log(this.PrintPassDetails);
        this.value = data[0].strOwnerName + data[0].strVehicleregNo + data[0].strvehicleMakeModel + data[0].dtepassvalidfrom +data[0].dtepassvalidTo ;

      })
    console.log( history.state.id);
  }
  
  OnInit() {
    //console.log(history.state);
    
  }
}
