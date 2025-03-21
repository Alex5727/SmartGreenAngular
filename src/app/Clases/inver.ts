export class Inver {
  
    public imageSrc !: string
    public nombreInvernadero !: string
    public owner !: string
    constructor(imageSrc:string, nombreInvernadero:string, owner:string) {
        this.imageSrc = imageSrc;
        this.nombreInvernadero = nombreInvernadero;
        this.owner = owner;
    }
}
