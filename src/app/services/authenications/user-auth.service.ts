import { Injectable } from '@angular/core';
import { UserserviceService } from '../DataServices/userservice.service';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../../models/user.model';
const VALIDATION_URL = "http://localhost:8765/user-service/login";
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  Id : number ;
  userlist : Array<User>;
  constructor(public ser : UserserviceService,public http : HttpClient) { 
  }
  //authenticates whether a user is authorized or not
  authenticate(userid : string, password : string) {
   // create a security token
   // create a security token
   let authenticationToken = "Basic " + window.btoa(userid + ":" + password);
   let headers = new HttpHeaders({
     Authorization : authenticationToken
   });
   console.log("calling server")
   // send the request
   return this.http.get(VALIDATION_URL, {headers}).pipe(
     // success function
     map(successData=>{
       sessionStorage.setItem("username", userid);
       // save the token
       sessionStorage.setItem("token", authenticationToken);
       return successData;
     }),
     
     // failure function
     map(failureData=>{
       // console message 
       return failureData;
     })
   );
  }
  //retrieve the authentication token of loggedin user
  getAuthenticationToken(){
    if(this.isUserLoggedIn())
      return sessionStorage.getItem("token");
    return null; 
  }
  //return a boolean value whether a user is loggedi or not
  isUserLoggedIn(): boolean{
    let user = sessionStorage.getItem('username');
    if(user == null)
      return false;
    return true;  
  }
  //retrieve the url of profile pic of loggedin user
  getProfileUrl():string{
    let url = sessionStorage.getItem("profile");
    return url;
  }
  //makes the user logout
  logout(){
    sessionStorage.clear();
    /*
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem("name")
    sessionStorage.removeItem("profile")
    sessionStorage.removeItem("token")
    */
  }
  //retrieve full name of the user 
  getUserDetails():string{
    let user = sessionStorage.getItem('name');
    return user;
  }
  //retrieve userid of one,who is currently loggedin
  getUserId():string{
    let userid = sessionStorage.getItem('userid');
    return userid;
  }
}
