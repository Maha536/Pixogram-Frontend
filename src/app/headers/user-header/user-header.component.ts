import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/authenications/user-auth.service';
import { UserserviceService } from '../../services/DataServices/userservice.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  username : string;
  profileImg : string;
  constructor(public auth : UserAuthService) {
    this.username=this.auth.getUserDetails();
    this.profileImg=this.auth.getProfileUrl();
    
    console.log("url got")
    console.log(this.profileImg)
    
   }

  ngOnInit() {
    
    
    
  }

}
