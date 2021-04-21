export class Follow{
    userId : number;
    followerId : number;
    //constructor
    constructor(userId:number,followerId:number){
        this.userId = userId;
        this.followerId = followerId;
    }
}