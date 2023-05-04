import { Component, OnInit } from '@angular/core';
//import { Router} from '@angular/router';
import { User } from '../shared/user.model';
import { NgForm, NgModel } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr'
import { CanActivate, Router, RouterLinkWithHref, RouterLink } from '@angular/router';
import { sha256 } from 'js-sha256';
import { AuthService } from '../shared/Auth/auth.service'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private authServ: AuthService, private userService: UserService, private toastr: ToastrService, private router: Router) {
    localStorage.setItem('IsAuth',"false");
   }
  public isAuth:boolean = false;
  ngOnInit() {
    this.resetForm();
  }
  encrypted = '';
  onChange(value: any) {

    const enc = sha256.update(value.target.value).hex();
    this.encrypted = enc;
    this.user.Password = enc;
    //document.getElementById('user')?.setAttribute("value",enc);
    //alert(enc);
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',

    }
  }

  OnSubmit(form: NgForm) {
    console.log(form.value);
    this.userService.registerUser(form.value.UserName,form.value.Password)
      .subscribe((data: any) => {
        this.authServ.MarkValid(form.value.UserName,form.value.Password)
        .subscribe((data:any)=>{

        })
        localStorage.setItem('UName',form.value.UserName);
        localStorage.setItem('UPass',form.value.Password);
        const re = data;
        this.router.navigate(['/dashboard']);
        this.resetForm();
        console.log(re.message);
      },
        (error: any) => {
          alert(error.error.message)
          console.log(error.error.message);

          this.resetForm();
        }
      );

    // this.authServ.login(form.value.UserName,form.value.Password)
    //   .subscribe((data: any) => {
    //     console.log("loginData",data)
    //     // if(data == true){
    //     //   this.authServ.isAuthenticated =true;
    //     // }
    //     // console.log("loginServ",this.authServ.isAuthenticated); 
    //     this.router.navigate(['/dashboard']);
    //     this.resetForm();        
    //   },
    //     (error: any) => {
    //       console.log("error",error.error.message);

    //       this.resetForm();
    //     }
    //   );

  }
}
