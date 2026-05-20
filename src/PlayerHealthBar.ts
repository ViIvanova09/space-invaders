import { Container, Graphics } from "pixi.js"; 
import {GAME_HEIGHT, GAME_WIDTH, healthBarHight, healthBarWidth} from "./Constants";

export class PlayerHealthBar extends Container {
    healthBar: Graphics;
    constructor(){
        super()
        this.healthBar = new Graphics()
            .rect(0, 0, healthBarWidth, healthBarHight)
            // .stroke({color: 0xff1010, pixelLine: true})
            .fill({color: 0xff1010})
    
        this.healthBar.x = GAME_WIDTH / 2 + 550;
        this.healthBar.y = GAME_HEIGHT / 2 - 340;

        this.addChild(this.healthBar)
    }
}