import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserAuthService } from '../authenications/user-auth.service';
import { Userid } from '../../models/userid.model';
import { User } from '../../models/user.model';
import { Follow } from '../../models/follow.model';
import { NewsFeedModel } from '../../models/newfeeddata.model';
const BasicURL = "http://localhost:8765/user-service/users";
const UseridURL = "http://localhost:8765/user-service/custom";
const UsernamesURL = "http://localhost:8765/user-service/usernames";
const REGISTER_URL = "http://localhost:8765/user-service/register";
const MISC_URL = "http://localhost:8765/misc-plumbing";
const FOLLOW_URL = "http://localhost:8765/follow-service";
const PLUMBING_URL = "http://localhost:8765/media-plumbing";
const NEWSFEED_URL = "http://localhost:8765/newsfeed-service";

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  user : Userid;
  constructor(public http : HttpClient ) {
   }

   getSearchedUsers(searchText : string){
     return this.http.get(MISC_URL + "/searched-users/" + searchText + "/myid/" + sessionStorage.getItem("userid"));
   }
  getAllUsernames():any{
    return this.http.get(UsernamesURL);
  }

  doFollow(follow:Follow):any{
    return this.http.post(FOLLOW_URL+"/follow",follow);
  }

  doUnFollow(other:number):any{
    return this.http.delete(FOLLOW_URL+"/unfollow/mine/"+sessionStorage.getItem("userid")+"/other/"+other);
  }

  postNewsfeed(news : NewsFeedModel):any{
    this.http.post(NEWSFEED_URL,news);
  }

  getId():any {
    
    let name = sessionStorage.getItem("username");
    return this.http.get(UseridURL+"/"+name);
   
  }
  getUser(id:number):any{
    return this.http.get(BasicURL+"/"+id);
  }

  addUser(user:User):any{
    return this.http.post(REGISTER_URL,user);
  }

  delete(id:number){
    this.http.delete(BasicURL+"/"+id);
  }

  update(id:number,user:User):any{
    console.log("updated user ===>>> "+user)
    return this.http.put(BasicURL+"/"+id,user);
  }

  getFollowers(id:number):any{
    return this.http.get(MISC_URL+"/followers/"+id)
  }

  getFollowing(id : number) : any{
    return this.http.get(MISC_URL+"/following/"+id)
  }

  getNewsfeed() : any {
    return this.http.get(NEWSFEED_URL+"/newsfeed/"+sessionStorage.getItem("userid"));
  }

  getProfile(id : number) : any{
    return this.http.get(PLUMBING_URL+"/profile/"+id+"/mine/"+sessionStorage.getItem("userid"));
  }
}
