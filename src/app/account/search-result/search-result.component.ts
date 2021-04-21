import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserserviceService } from '../../services/DataServices/userservice.service';
import { SearchedUserlList } from '../../models/searcheduserlist.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  
  result : string;
  searchtext : string;
  myFormGroup : FormGroup;
  constructor(private userService : UserserviceService,  public route:ActivatedRoute,formbuilder : FormBuilder,public router : Router) {
    console.log("search started")
    
    this.myFormGroup = formbuilder.group(
      {
        "keyword" : new FormControl(),
      }
    );
    console.log("search completed")
   }
   search(){
    let txt = this.myFormGroup.controls['keyword'].value;
    this.router.navigate(['search-result'+"/"+txt]);
   }

  ngOnInit() {
    this.route.params.subscribe((x) =>this.searchtext = x["searchtxt"]) ;
    // this.result = "You have been searched for :"+this.searchtext;
    this.userService.getSearchedUsers(this.searchtext).subscribe(
      (response : SearchedUserlList) => {
        
      }
    );
  }

}
