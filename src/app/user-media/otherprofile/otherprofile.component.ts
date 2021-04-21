import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../../services/DataServices/userservice.service';
import { Media } from '../../models/media.model';
import { CompleteProfile } from '../../models/completeprofile.model';
import { MediaserviceService } from '../../services/mediaservices/mediaservice.service';
import { FormGroup,FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-otherprofile',
  templateUrl: './otherprofile.component.html',
  styleUrls: ['./otherprofile.component.css']
})
export class OtherprofileComponent implements OnInit {
  id : number;
  myFormGroup : FormGroup;
  commenttab : number;
  filelist : Array<Media>;
  profileImg : string;
  profileName : string;
  profileUsername : string;
  constructor(formbuilder:FormBuilder,public route : ActivatedRoute,public userService : UserserviceService,public mservice : MediaserviceService) {
    this.myFormGroup = formbuilder.group(
      {
        "keyword" : new FormControl(),
      }
    );
   }
  //
  doLike(mediaId : number){
    this.mservice.doLike(mediaId).subscribe((responce)=>{
      alert("Like successful");
    }),
    (failure)=>{
      alert("Like Unsuccessful");
    }
  }

  doUnlike(mediaId : number){
    this.mservice.doUnlike(mediaId).subscribe((responce)=>{
      alert("Unlike successful");
    }),
    (failure)=>{
      alert("Unlike Unsuccessful");
    }
  }

  doComment(id : number){
    this.commenttab = id;
  }

  postComment(id:number){
    let mediaId = id;
    alert(mediaId)
    let comment = this.myFormGroup.controls['keyword'].value;
    alert(comment)
    this.mservice.doComment(mediaId,comment).subscribe((responce)=>{
      window.location.reload();
    })
    
  }
  ngOnInit() {
    this.route.params.subscribe((parameter) => {
      this.id = parameter["userId"];
    });
    this.userService.getProfile(this.id).subscribe((responce:CompleteProfile) => {
        this.profileImg = "http://localhost:8765/user-service/"+responce.profile;
        this.profileName = responce.name;
        this.profileUsername = responce.username;
        this.filelist = responce.mediaList.map((media:Media) => {
          media.url = "http://localhost:8765/media-service/"+media.url;
          return media;
        })
  
    });
  }

}
