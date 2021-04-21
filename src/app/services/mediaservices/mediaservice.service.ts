import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActionAddData } from '../../models/action.model';
import { CommentsData } from '../../models/commentsdata.model';
import { NewsFeedModel } from '../../models/newfeeddata.model';


@Injectable({
  providedIn: 'root'
})
export class MediaserviceService {
  baseUrl: string = 'http://localhost:8765/media-plumbing';
  ACTION_URL : string = "http://localhost:8765/action-service";
  COMMENT_URL : string = "http://localhost:8765/comment-service";
  NEWSFEED_URL : string = "http://localhost:8765/newsfeed-service/newsfeed";
  constructor( public http:HttpClient) {

   }

   getAllMedia() : any{
    return this.http.get(this.baseUrl+"/media/"+sessionStorage.getItem("userid"));
  }

  doLike(mediaId : number) : any {
    let action = new ActionAddData(mediaId,true,Number(sessionStorage.getItem("userid")));
    let news =new NewsFeedModel(sessionStorage.getItem("userid"),"You Liked a Picture");
    this.http.post(this.NEWSFEED_URL,news);
    return this.http.post(this.ACTION_URL+"/action",action);
  }
  
  doUnlike(mediaId : number) : any {
    let action = new ActionAddData(mediaId,false,Number(sessionStorage.getItem("userid")));
    let news =new NewsFeedModel(sessionStorage.getItem("userid"),"You unliked a Picture");
    this.http.post(this.NEWSFEED_URL,news);
    return this.http.delete(this.ACTION_URL+"/action"+action);
  }

  doComment(mediaId:number,comment:String){
    let data = new CommentsData(mediaId,sessionStorage.getItem("userid"),comment);
    let news =new NewsFeedModel(sessionStorage.getItem("userid"),"You Commented on a Picture");
    this.http.post(this.NEWSFEED_URL,news);
    return this.http.post(this.COMMENT_URL+"/comment",data);
  }

  getMedia(id:number):any{
    return this.http.get(this.baseUrl+"/mediadetails/"+id);
  }

  pushFileToStorage(file: File,title,description,tags,url,type) : Observable<HttpEvent<{}>>{
    
    const formdata: FormData = new FormData();

    // let product = new  Product (name,category,cost,file,url);
    formdata.append('file', file, url);
    formdata.append('title',title)
    formdata.append('description',description)
    formdata.append('type',type)
    console.log("userid in media : "+sessionStorage.getItem("userid"))
    formdata.append('userid',sessionStorage.getItem("userid"))
    formdata.append("tags",tags)
    formdata.append('url',url)
    
    // header info to set for responding the progress report
    /*return this.http.post(this.baseUrl, formdata,{
      reportProgress: true,
      responseType: 'text'
    });*/

    const req = new HttpRequest('POST', `${this.baseUrl}/media`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
