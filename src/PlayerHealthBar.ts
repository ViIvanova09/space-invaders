import { Container, Graphics } from "pixi.js";
import { GAME_WIDTH } from "./Constants";
// import { gsap } from "gsap/gsap-core";

export class PlayerHealthBar extends Container {
    healthBar: Graphics;
    healthBarWidth: number;
    // maxHealthBarWidth: number;
    constructor() {
        super();
        this.healthBarWidth = 150;
        // this.maxHealthBarWidth = 150;
        this.healthBar = new Graphics()
            .rect(0, 0, this.healthBarWidth, 20)
            .fill(0xff1010);

        this.healthBar.x = GAME_WIDTH - this.healthBar.width - 20;
        this.healthBar.y = 13;

        this.addChild(this.healthBar);
        console.log('update3', this.healthBarWidth);
        
    }
    public updateHealthBar() {
        this.healthBar.clear();
        
        this.healthBar.rect(0, 0, this.healthBarWidth, 20);
        console.log('update2', this.healthBarWidth);
        
        this.healthBar.fill(0xff1010);
    }
    public resetBar(){
        this.healthBarWidth = 150;
        this.updateHealthBar();
    }
}