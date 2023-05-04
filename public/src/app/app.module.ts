import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule} from './app-routing.module'
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserService, ForgotPassword, validateOtp, createNewPass } from './shared/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { DevicemasterComponent } from './masterconfig/devicemaster/devicemaster.component';
import { GridModule , PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { PismasterComponent } from './masterconfig/pismaster/pismaster.component';
import { ButtonModule, ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpModule} from '@angular/http';
import { ForgotComponent } from './sign-up/forgot/forgot.component';
import { DeviceService } from './masterconfig/devicemaster/device.service';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { MenuModule }  from '@progress/kendo-angular-menu'
import { PisService } from './masterconfig/pismaster/pis.service';
import { DropDownListModule, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from '@progress/kendo-angular-label';
import { FaremasterComponent } from './masterconfig/faremaster/faremaster.component';
import { SensormasterComponent } from './masterconfig/sensormaster/sensormaster.component';
import { GatewaymasterComponent } from './masterconfig/gatewaymaster/gatewaymaster.component';
import { PassdetailsmasterComponent } from './masterconfig/passdetailsmaster/passdetailsmaster.component';
import { FareService } from './masterconfig/faremaster/fare.service';
import { SensorService } from './masterconfig/sensormaster/sensor.service';
import { GatewayService } from './masterconfig/gatewaymaster/gateway.service';
import { PassdetailsService } from './masterconfig/passdetailsmaster/passdetails.service';
import { DashboardService } from './dashboard/dashboard.service';
import { UserassignmentComponent } from './userconfig/UserAssignment/userassignment.component';
import { SettingmasterComponent } from './userconfig/settingmaster/settingmaster.component';
import { AssignmentService } from './userconfig/UserAssignment/assignment.service';
import { SettingService } from './userconfig/settingmaster/setting.service';
import { OperationaldashboardComponent } from './operationaldashboard/operationaldashboard.component';
import { OperationsService } from './operationaldashboard/operations.service';

import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { PrintpassComponent } from './masterconfig/passdetailsmaster/printpass/printpass.component';
import { PrintpassService } from './masterconfig/passdetailsmaster/printpass/printpass.service';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { AuthService } from './shared/Auth/auth.service';
import { AuthGuard } from './shared/Auth/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { CityMasterComponent } from './masterconfig/city-master/city-master.component';
import { AreaMasterComponent } from './masterconfig/area-master/area-master.component';
import { PrakingLotComponent } from './masterconfig/praking-lot/praking-lot.component';
import { ParkingSlotComponent } from './masterconfig/parking-slot/parking-slot.component';
import { VehicleTypeComponent } from './masterconfig/vehicle-type/vehicle-type.component';
import { UserMasterComponent } from './User/user-master/user-master.component';
import { UserTypeMasterComponent } from './User/user-type-master/user-type-master.component';
import { AgencyMasterComponent } from './User/agency-master/agency-master.component';

import{environment} from '../environments/environment.prod';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleMapsModule } from '@angular/google-maps';
import { ParkingmapComponent } from './dashboard/parkingmap/parkingmap.component';
import { MappositionComponent } from './dashboard/mapposition/mapposition.component';
import { JsmapComponent } from './dashboard/jsmap/jsmap.component';

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    DashboardComponent,
    DevicemasterComponent,
    PismasterComponent,
    ForgotComponent,
    FaremasterComponent,
    SensormasterComponent,
    GatewaymasterComponent,
    PassdetailsmasterComponent,
    UserassignmentComponent,
    SettingmasterComponent,
    OperationaldashboardComponent,
    PrintpassComponent,
    NavbarComponent,
    CityMasterComponent,
    AreaMasterComponent,
    PrakingLotComponent,
    ParkingSlotComponent,
    VehicleTypeComponent,
    ParkingmapComponent,
    MappositionComponent,
    JsmapComponent,
    UserMasterComponent,
    UserTypeMasterComponent,
    AgencyMasterComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    GridModule,
    ButtonModule,
    InputsModule,
    CommonModule,
    MatDialogModule,
    HttpModule,
    ButtonsModule,
    TabStripModule,
    PDFModule,
    ExcelModule,
    ReactiveFormsModule,
    MenuModule,
    DropDownListModule,
    DropDownsModule,
    LabelModule,
    InputsModule,
    ChartsModule,
    ButtonsModule,
    DatePickerModule,
    NgxQRCodeModule,
    LayoutModule,
    GoogleMapsModule
  ],
  // ,{ provide: APP_BASE_HREF, useValue: window.location.pathname } (insert in provider)
  providers: [UserService, ForgotPassword,validateOtp, createNewPass, DeviceService,PisService,FareService, SensorService, GatewayService,PassdetailsService, DashboardService, AssignmentService,SettingService, OperationsService,PrintpassService, AuthService,AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
