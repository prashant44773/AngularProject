import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DevicemasterComponent } from '../masterconfig/devicemaster/devicemaster.component';
import { PismasterComponent } from '../masterconfig/pismaster/pismaster.component';
import { DashboardService } from './dashboard.service';
import { LineStyle } from '@progress/kendo-angular-charts';
import { AuthService } from '../shared/Auth/auth.service';
import { UserService } from '../shared/user.service';


//import H from '@here/maps-api-for-javascript';
import { ElementRef, OnInit, ViewChild } from '@angular/core';



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {


    public Master: any[];
    public style: LineStyle = 'smooth';
    public OutTime: number[] = [];
    public TwoWheeler: number[] = [];
    public FourWheeler: number[] = [];


    public show: boolean = true;


    constructor(private router: Router, private getDashboard: DashboardService, private authServ: AuthService, private userService: UserService) {
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
    ngOnInit(): void {
    }

}
