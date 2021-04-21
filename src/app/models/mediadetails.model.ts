import { Comments } from "./comments.model";
import { CommentsResponse } from "./commentsresponse.model";

export class MediaDetails{
     id : number;
	 userId : number;
	 title : string;
	 description : string;
	 tags : string;
	 type : string;
	 url : string;
	 likes : number;
	 unlikes : number;
	 commentsList : Array<CommentsResponse>;
}