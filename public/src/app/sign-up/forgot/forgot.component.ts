import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ForgotPassword, validateOtp, createNewPass  } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr'
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';
import { Forgot, Otpvalidation, CreatePass } from '../../shared/forgot.model';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  user: Forgot;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  emailvalidate = true;
  otpvalidate = false;
  generateNewPass = false;
  tempEmail = "";

  constructor(private forgotPass: ForgotPassword,private valO: validateOtp,private crePass: createNewPass, private router: Router) { }

  sendOtp(emailOtp: NgForm) {
    let temp = new Forgot;
    temp.email = emailOtp.controls['email'].value;
    this.tempEmail = emailOtp.controls['email'].value;
    this.forgotPass.Forgot(temp)
    .subscribe(data => {
      const re = data;
      this.emailvalidate = false;
      this.otpvalidate = true;
    },
      (error: any) => {
        console.log(error.error.message);
      }
    );
  }
  validateOtp(emailOtp: NgForm) {
    let temp = new Otpvalidation;
    temp.OTP = emailOtp.controls['otp'].value;
    temp.email = this.tempEmail;
    this.valO.vOtp(temp)
    .subscribe(data => {
      const re = data;
      this.emailvalidate = false;
      this.otpvalidate = false;
      this.generateNewPass = true
    },
      (error: any) => {
        console.log(error.error.message);
      }
    );

  }
  ValidatePass(generateNewPass: NgForm) {
    let pas = generateNewPass.controls['Password'].value;
    let con = generateNewPass.controls['ConPassword'].value;

    if(pas === con){
      alert(`The Password is Matched`);
      this.createPass(generateNewPass);
    }
    else{
      alert(`The Password is Not Matched`);
    }

    }
  createPass(generateNewPass: NgForm) {
    let temp = new CreatePass;
    temp.email = this.tempEmail;
    temp.Newpass = generateNewPass.controls['Password'].value;
    this.crePass.chaPass(temp)
    .subscribe((data:any) => {
      const re = data;
      this.tempEmail = "";
      this.router.navigate(['/login']);
      this.emailvalidate = true;
      this.otpvalidate = false;
      this.generateNewPass = false;
    },
      (error: any) => {
        console.log(error.error.message);
      }
    );

  }
  EmailValidation() { return this.emailvalidate;  }

  ValidateOTP() { return this.otpvalidate; }

  GeneratePassWord() {
    return this.generateNewPass;
    // return true;
  }

}
