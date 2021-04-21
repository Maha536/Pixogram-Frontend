export class CommentsData{
    mediaId : number;
	userId : number;
    comments : string;
    
    constructor(mediaId,userId,comments){
        this.mediaId = mediaId;
        this.userId = userId;
        this.comments = comments;
    }
}