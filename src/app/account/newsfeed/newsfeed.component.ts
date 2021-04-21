import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../services/DataServices/userservice.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  
  list : Array<String>;
  constructor(public userService : UserserviceService) { }

  ngOnInit() {
    console.log("Inside NgOnInit()")
    this.userService.getNewsfeed().subscribe((responce)=>{
      this.list = responce;
      console.log("list created ==>> "+this.list)
    })
    
  }

}
