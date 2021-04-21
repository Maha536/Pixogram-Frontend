import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../services/DataServices/userservice.service';
import { UserAuthService } from '../../services/authenications/user-auth.service';
import { FollowUserData } from '../../models/followuserdata.model';
import { FollowUserDataList } from '../../models/FollowuserDataList.model';
import { Router } from '@angular/router';
import { NewsFeedModel } from '../../models/newfeeddata.model';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  id : number;
  followList : Array<FollowUserData>;
  constructor(public userService:UserserviceService,public auth:UserAuthService,public router : Router) { }
  //unfollow the user 
  doUnfollow(id:number,name : string){
    this.userService.doUnFollow(Number(id)).subscribe((responce)=>{
      window.location.reload();
    })
  }
  //goto profile of the user with UserId
  getProfile(userId:number){
    this.router.navigate(['/profile/'+userId]);
  }
  ngOnInit() {
    this.id  = Number(this.auth.getUserId());
    this.userService.getFollowing(this.id).subscribe((responce:FollowUserDataList)=>{
      this.followList = responce.followList.map(user => {
        user.url = "http://localhost:8765/user-service/" + user.url;
        return user;
      });

    });
  }

}
