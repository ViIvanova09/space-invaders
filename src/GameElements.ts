import {Sprite, Texture } from "pixi.js";

export class GameElements extends Sprite {

    constructor(texture: Texture, x: number, y: number){
        super(texture)
    
        this.anchor.set(0.5, 1);
        this.position.set(x, y); 
         this.scale.set(0.15);
    }

}
