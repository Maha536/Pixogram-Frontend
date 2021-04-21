export class NewsFeedModel{
    userId : number;
    feed : string;

    constructor(userId,feed){
        this.userId = userId;
        this.feed = feed;
    }
}