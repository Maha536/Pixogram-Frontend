import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MediaserviceService } from 'src/app/services/mediaservices/mediaservice.service';
import { Media } from 'src/app/models/media.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  ftitle : string;
  fdesc : string;
  ftags : string;
  file : any;
  myFormGroup : FormGroup;
  selectedFiles: FileList;

  selectedFile : File;
  date: Date;

  constructor(formbuilder : FormBuilder,public mservice : MediaserviceService,public router:Router) {

    this.myFormGroup=formbuilder.group({
      
      "title" : new FormControl(""),
      "description" : new FormControl(""),
      "tags" : new FormControl(""),
    });
   
   }
onImageLoad(event){
  this.selectedFiles = event.target.files;
  this.selectedFile = this.selectedFiles.item(0);
}

   singleUpload(){
    
    this.ftitle = this.myFormGroup.controls['title'].value;
    this.fdesc = this.myFormGroup.controls['description'].value;
    this.ftags = this.myFormGroup.controls['tags'].value;
    this.date = new Date();
    let dateString = `_${this.date.getTime()}_${this.date.getDate()}_${this.date.getFullYear()}`
    if (this.selectedFile.type == 'image/png') {
      this.file = `${this.ftitle}${dateString}.png`;
    }
    if (this.selectedFile.type == 'image/jpeg' || this.selectedFile.type == 'image/jpg') {
      this.file = `${this.ftitle}${dateString}.jpeg`;
    }
  
    console.log(this.file+"\n"+this.ftitle+"\n"+this.fdesc+"\n"+this.ftags);
    //let uploadfile = new Media(this.file,this.ftitle,this.fdesc,this.ftags)

    this.mservice.pushFileToStorage(this.selectedFile,this.ftitle,this.fdesc,this.ftags,this.file,this.selectedFile.type).subscribe(
      (responce)=>{this.router.navigate(['/account/'])});

  }

  ngOnInit() {
  }

}
