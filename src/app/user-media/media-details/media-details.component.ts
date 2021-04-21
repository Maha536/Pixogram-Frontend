import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaserviceService } from 'src/app/services/mediaservices/mediaservice.service';
import { Media } from 'src/app/models/media.model';
import { MediaDetails } from '../../models/mediadetails.model';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.css']
})
export class MediaDetailsComponent implements OnInit {
  id : number;
  file : MediaDetails;
  constructor(public route:ActivatedRoute,public mservice:MediaserviceService) { }

  ngOnInit() {
    this.route.params.subscribe((x) =>this.id = x["mid"]) ;
    console.log(this.id);
    this.mservice.getMedia(this.id).subscribe((responce:MediaDetails)=>{
      this.file = responce;
      this.file.url = "http://localhost:8765/media-service/"+this.file.url;
    }); 
  }
}
