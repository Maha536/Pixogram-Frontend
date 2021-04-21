export class ActionAddData{
    mediaId : number ;
	status : boolean ;
    userId : number ;
    
    constructor(mediaId:number,status:boolean,userId:number){
        this.mediaId = mediaId;
        this.status = status;
        this.userId = userId;
    }
}