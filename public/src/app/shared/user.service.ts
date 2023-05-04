import { Injectable, Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import {  Response } from "@angular/http";
//import {Observable} from 'rxjs';
//import 'rxjs/add/operator/map';
import { User } from './user.model';
import { Forgot, Otpvalidation, CreatePass } from './forgot.model';


@Injectable()
export class UserService {
  readonly rootUrl = 'https://localhost:44385/api/Login/Log';
  public IsActive:boolean = false;
  constructor(private http: HttpClient) { }

  registerUser(Uname:string , Pass:string){
    const body: User = {
      UserName: Uname,
      Password: Pass,
    }
    this.IsActive = true;
    return this.http.post(this.rootUrl , body);
  }
}
@Injectable()
export class ForgotPassword{
  readonly rootUrl = 'https://localhost:44385/api/Login/Forgotpassword';
  constructor(private http: HttpClient) { }

  Forgot(forget : Forgot){
    const body: Forgot = {
      email: forget.email
    }
    return this.http.post(this.rootUrl , body);
  }
}
@Injectable()
export class validateOtp{
  readonly rootUrl = 'https://localhost:44385/api/Login/validateotp';
  constructor(private http: HttpClient) { }

  vOtp(otp : Otpvalidation){
    const body: Otpvalidation = {
      email:otp.email,
      OTP: otp.OTP
    }
    return this.http.post(this.rootUrl , body);
  }
}
@Injectable()
export class createNewPass{
  readonly rootUrl = 'https://localhost:44385/api/Login/Changepass';
  constructor(private http: HttpClient) { }

  chaPass(newPass : CreatePass){
    const body: CreatePass = {
      email:newPass.email,
      Newpass: newPass.Newpass
    }
    return this.http.post(this.rootUrl , body);
  }
}


