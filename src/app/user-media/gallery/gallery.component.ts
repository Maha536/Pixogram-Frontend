import { Component, OnInit } from '@angular/core';
import { MediaserviceService } from 'src/app/services/mediaservices/mediaservice.service';
import { Media } from 'src/app/models/media.model';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/DataServices/userservice.service';
import { MediaListModel } from 'src/app/models/medialistmodel.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  fileslist : Array<Media>;
  constructor(public mservice : MediaserviceService,public router:Router,public userSer:UserserviceService) {
    
   }

   getDetails(id : number){
     console.log(id);
     this.router.navigate(['/media-details/'+id])
    }

  ngOnInit() {
    this.mservice.getAllMedia().subscribe((responce : MediaListModel)=>{
      console.log("response got")
      console.log(responce)
      this.fileslist=responce.filelist.map(media => {
        media.url = "http://localhost:8765/media-service/" + media.url;
        console.log(media.url)
        return media;
      });
    });
    
    console.log("All Media is : ")
    console.log(this.fileslist)
    
  }

}
