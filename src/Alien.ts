import { Application, Texture } from "pixi.js";
import { GameElements } from "./GameElements";

export class Alien extends GameElements {
    constructor(texture: Texture, app: Application) {
        super(texture, app.screen.width / 2, app.screen.height / 2);
        this.position.set(this.x, this.y);
    }
}
