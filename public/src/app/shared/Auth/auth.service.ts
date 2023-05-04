import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { useAnimation } from '@angular/animations';
import { UserService } from '../user.service'
// import { Observable } from 'rx';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isAuthenticated: boolean = false;
  UserName:string = "";
  Pass:string = "";
  constructor(private verifyUser: UserService) { }

  getIsAuth(): Observable<boolean> {
    return of(this.isAuthenticated);
  }
  MarkValid(Uname: string , password: string):Observable<boolean> {
    this.UserName = Uname;
    this.Pass = password;
    this.isAuthenticated = true;
    localStorage.setItem('IsAuth',"true")
    // alert(this.isAuthenticated)
    return of(true);
  }
  LoggedIN():Observable<boolean> {
    console.log("LoggedIN Called")
    this.isAuthenticated = true;
    return of(true);
  }

}
