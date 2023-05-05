import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent} from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicemasterComponent } from './masterconfig/devicemaster/devicemaster.component';
import { PismasterComponent } from './masterconfig/pismaster/pismaster.component';
import { ForgotComponent } from './sign-up/forgot/forgot.component';
import { FaremasterComponent } from './masterconfig/faremaster/faremaster.component';
import { SensormasterComponent } from './masterconfig/sensormaster/sensormaster.component';
import { GatewaymasterComponent } from './masterconfig/gatewaymaster/gatewaymaster.component';
import { PassdetailsmasterComponent } from './masterconfig/passdetailsmaster/passdetailsmaster.component';
import { SettingmasterComponent } from './userconfig/settingmaster/settingmaster.component';
import { UserassignmentComponent } from './userconfig/UserAssignment/userassignment.component';
import { OperationaldashboardComponent } from './operationaldashboard/operationaldashboard.component';
import { PrintpassComponent } from './masterconfig/passdetailsmaster/printpass/printpass.component';

import { AuthGuard } from './shared/Auth/auth.guard'
import { NavbarComponent } from './navbar/navbar.component';
import { CityMasterComponent } from './masterconfig/city-master/city-master.component';
import { AreaMasterComponent } from './masterconfig/area-master/area-master.component';
import { PrakingLotComponent } from './masterconfig/praking-lot/praking-lot.component';
import { VehicleTypeComponent } from './masterconfig/vehicle-type/vehicle-type.component';
import { ParkingmapComponent } from './dashboard/parkingmap/parkingmap.component';
import { JsmapComponent } from './dashboard/jsmap/jsmap.component';
import { AgencyMasterComponent } from './User/agency-master/agency-master.component';
import { UserTypeMasterComponent } from './User/user-type-master/user-type-master.component';
import { UserMasterComponent } from './User/user-master/user-master.component';

const routes: Routes = [
  { path:'nav',component:NavbarComponent},
  { path:'dashboard' , component: DashboardComponent},
  // { path:'dashboard' , component: DashboardComponent},
  { path:'login', component:SignUpComponent},
  //Master Config

  { path:'cityMaster' , component: CityMasterComponent},
  { path:'areaMaster' , component: AreaMasterComponent},
  { path:'parkingLot' , component: PrakingLotComponent},
  { path:'parkingSlot' , component: PrakingLotComponent},
  { path:'vehicleType' , component: VehicleTypeComponent},

  { path:'device' , component: DevicemasterComponent,canActivate:[AuthGuard]},
  { path:'pis' , component: PismasterComponent},
  { path:'faremaster' , component: FaremasterComponent},
  { path:'sensor' , component: SensormasterComponent},
  { path:'gateway' , component: GatewaymasterComponent},
  { path:'pass' , component: PassdetailsmasterComponent},
  { path:'printpass' , component: PrintpassComponent},
  //User Managment
  { path:'settingmaster' , component: SettingmasterComponent},
  { path:'userassignment' , component: UserassignmentComponent},
  { path:'userMaster' , component: UserMasterComponent},
  { path:'UserType' , component: UserTypeMasterComponent},
  { path:'agency' , component: AgencyMasterComponent},
  // DashBoard
  { path:'operationalDashboard' , component: OperationaldashboardComponent},
  { path:'map' , component: ParkingmapComponent},
  { path:'jsmap' , component: JsmapComponent},



  { path:'',redirectTo:'login', pathMatch:'full'},
  { path:'forgot' , component: ForgotComponent},
  { path:'BackToLogin' , component: SignUpComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
