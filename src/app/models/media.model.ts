export class Media {
    id : number ;
    userId : number;
    title : string;
    description : string;
    tags : string;
    type : string;
    url : string;
    likes : number;
    unlikes : number;
    status : boolean;
    comments : number;
     constructor(url,title,description,tags,type){
         this.url = url ;
         this.title = title;
         this.description = description;
         this.tags = tags;
         this.type = type;
     }
}