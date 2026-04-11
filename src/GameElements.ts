import { Sprite, Texture } from "pixi.js";

 export class GameElements extends Sprite {
    halfWidth;

    constructor(texture: Texture, x: number, y: number){
        super(texture) // calls the constructor of pixi's Sprite class
    
        this.anchor.set(0.5, 1);
        this.position.set(x, y); 
        this.scale.set(0.15);
        this.halfWidth = this.width / 2;
    }
}
