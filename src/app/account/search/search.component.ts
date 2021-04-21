import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../../services/DataServices/userservice.service';
import { SearchedUserlList } from '../../models/searcheduserlist.model';
import { SearchedUser } from '../../models/searcheduser.model';
import { Follow } from '../../models/follow.model';
import { NewsFeedModel } from '../../models/newfeeddata.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchtext : string;
  myFormGroup : FormGroup;
  result : string ;
  userList : Array<SearchedUser>;
  follow : Follow;
  constructor(formbuilder : FormBuilder, private userService: UserserviceService) {
    this.myFormGroup = formbuilder.group(
      {
        "keyword" : new FormControl(),
      }
    );
   }
   //search the users containing text in username
   search(){
     this.searchtext = this.myFormGroup.controls['keyword'].value;
     this.userService.getSearchedUsers(this.searchtext).subscribe(
      (response : SearchedUserlList) => {
        this.userList = response.userList;
        this.userList = this.userList.map(user =>{
          user.profileUrl = "http://localhost:8765/user-service/"+user.profileUrl;
          return user;
        });
      }
    );
   }
   //do following method
   dofollow(otherId:HTMLInputElement,name:string){
      this.follow = new Follow(Number(otherId.value),Number(sessionStorage.getItem("userid")));
      this.userService.doFollow(this.follow).subscribe((responce) => {
        window.location.reload();    
      }) 
   }
   //do unfollowing method
   dounfollow(otherId:HTMLInputElement,name:string){
    this.userService.doUnFollow(Number(otherId.value)).subscribe((responce) => {
      window.location.reload()     
    });
   }
  ngOnInit() {
  }

}
