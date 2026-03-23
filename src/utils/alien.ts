import { Application, Assets, Sprite } from "pixi.js";

export class Alien {
    sprite;

    constructor(app: Application) {
        const texture = Assets.get("assets/alien.png");

        this.sprite = new Sprite(texture);
        console.log("img-", texture);
        
        this.sprite.anchor.set(0.5, 1);
        this.sprite.position.set(app.screen.width / 2, app.screen.height - 10);
        this.sprite.scale.set(0.15);     
    }

    public getSprite() { //get sprite only return
        return this.sprite;
    }
    // private setBoundaries(app: Application) {
    //     // clamping setting boundaries

    //     this.sprite.x = Math.max(this.halfWidth, Math.min(app.screen.width - this.halfWidth, this.sprite.x)); 
    // }
}