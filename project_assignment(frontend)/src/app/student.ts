import { Project } from "./project"

export class Student {
    id?:Number
    name:String 
    average:Number 
    projects:Project [] 

    constructor(name:String,average:Number,projects:Project[],id?:Number){
        this.name=name 
        this.average =average 
        this.projects=projects
        this.id=id
    }
}
