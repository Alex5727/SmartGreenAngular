export class Inver {
  
    public imageSrc !: string
    public title !: string
    public owner !: string
    constructor(imageSrc:string, title:string, owner:string) {
        this.imageSrc = imageSrc;
        this.title = title;
        this.owner = owner;
    }
}
