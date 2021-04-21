import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/authenications/user-auth.service';
import { UserserviceService } from '../../services/DataServices/userservice.service';
import { FollowUserData } from '../../models/followuserdata.model';
import { FollowUserDataList } from '../../models/FollowuserDataList.model';
@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  id : number;
  followList : Array<FollowUserData>;
  constructor(public auth : UserAuthService,public userService:UserserviceService) { }

  ngOnInit() {
    this.id = Number(this.auth.getUserId());
    this.userService.getFollowers(this.id).subscribe((responce:FollowUserDataList)=>{
      this.followList = responce.followList.map(user => {
        user.url = "http://localhost:8765/user-service/" + user.url;
        return user;
      });

    });
  }

}
