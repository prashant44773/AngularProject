import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';
import { AuthService } from '../shared/Auth/auth.service';
import { UserService } from '../shared/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    public ShowClose = false;
    public ShowOpen = true;

    public ShowMaster = false;
    public ShowUser = false;
    public ShowDashboard = false;
    public expanded = false;



    constructor(private router: Router, private getDashboard: DashboardService, private authServ: AuthService, private userService: UserService) { }
    OnClick() {
        this.ShowClose = !this.ShowClose;
        this.ShowOpen = !this.ShowOpen;
    }
    OnMasterClick() {

        this.ShowMaster = !this.ShowMaster;
        if (this.ShowUser) {
            this.ShowUser = !this.ShowUser;
        }
        if (this.ShowDashboard) {
            this.ShowDashboard = !this.ShowDashboard;
        }

    }
    OnUserClick() {

        this.ShowUser = !this.ShowUser;
        if (this.ShowMaster) {
            this.ShowMaster = !this.ShowMaster;
        }
        if (this.ShowDashboard) {
            this.ShowDashboard = !this.ShowDashboard;
        }
    }
    OnDashboardClick(){
        this.ShowDashboard = !this.ShowDashboard;
        if (this.ShowMaster) {
            this.ShowMaster = !this.ShowMaster;
        }
        if (this.ShowUser) {
            this.ShowUser = !this.ShowUser;
        }
    }
    public onSelect(): void {


        console.log(localStorage.getItem('UName'));
        console.log(localStorage.getItem('UPass'));
        this.userService.registerUser(this.authServ.UserName, this.authServ.Pass)
            .subscribe((data: any) => {
                this.authServ.MarkValid(this.authServ.UserName, this.authServ.Pass)
                    .subscribe((data: any) => {

                    })
            },
                (error: any) => {
                    console.log(error.error.message);
                }
            );
        
        // this.authServ.isAuthenticated = true;

        // alert(console.log("Local",localStorage.getItem('UserName')));
        // this.authServ.MarkValid("", "")
        //     .subscribe((data: any) => {
        //         console.log("LoggedIN", data)
        //     })

    }
}
