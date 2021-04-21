import { Media } from "./media.model";

export class CompleteProfile{
    userid : number;
	username : string;
	name : string;
	profile : string;
	mediaList : Array<Media>;
}