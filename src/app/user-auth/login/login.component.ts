import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/authenications/user-auth.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserserviceService } from 'src/app/services/DataServices/userservice.service';
import { ResponseData } from '../../models/responce.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginid:string;
  loginpwd:string;
  submitted = false;
  errtext : string ;
  authorized : boolean;
  myFormGroup : FormGroup;
  userlist : Array<User>;
  res : ResponseData;
  constructor(public auth:UserAuthService,public router : Router,public formbuilder: FormBuilder,public ser : UserserviceService) { 
    this.errtext = "We are playing a audio for you..";
    this.authorized = true;
    this.myFormGroup=formbuilder.group({
      "userid" : new FormControl("",[Validators.required,Validators.pattern('^[A-Za-z0-9]{3,10}$')]),
      "userpwd" : new FormControl("", [Validators.required,Validators.minLength(6),Validators.maxLength(10)])
    });
  console.log("Inside constructor")
  }

  get f(){
    return this.myFormGroup.controls;
  }

  login(){
    this.loginid = this.myFormGroup.controls['userid'].value;
    this.loginpwd = this.myFormGroup.controls['userpwd'].value;
    this.submitted = true;
    this.auth.authenticate(this.loginid, this.loginpwd).subscribe(
      // success function
      (successData:ResponseData)=>{
        this.res = successData;
        console.log(this.res)
        //sessionStorage.setItem("sample",String(this.res.profile))
        sessionStorage.setItem("profile","http://localhost:8765/user-service/"+String(this.res.profile))
        sessionStorage.setItem("name",this.res.firstname+" "+this.res.lastname);
        sessionStorage.setItem("userid",String(this.res.id))
        
        this.authorized = true
        
        
        this.router.navigate(['/gallery'])
        
      },
      // failure function
      failureData => {
        /*let audio = new Audio();
        audio.src = "../../../assets/images/Balakrishna.mp3";
        audio.load();
        audio.play();*/
        this.authorized = false;
      }
    );
  }

  ngOnInit() {

  }

}
