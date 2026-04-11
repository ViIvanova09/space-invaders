import { Texture } from "pixi.js";
import { GameElements } from "./GameElements";

export class Alien extends GameElements {

    constructor(texture: Texture, x: number, y: number) {
        super(texture,  x * 2 , y * 2);
       
        this.position.set(this.x, this.y);
    }
}
