import { Application, Assets, Sprite } from "pixi.js";

export class SpaceShip {
    sprite;
    arrowLeft;
    arrowRight;
    speed;
    halfWidth;

    constructor(app: Application) {
        const texture = Assets.get("assets/spaceShip.png");

        this.sprite = new Sprite(texture);
        this.sprite.anchor.set(0.5, 1);
        this.sprite.position.set(app.screen.width / 2, app.screen.height - 10); //x=480, y=530
        this.sprite.scale.set(0.15);

        this.arrowLeft = false;
        this.arrowRight = false;
        this.speed = 5;

        this.halfWidth = this.sprite.width / 2;        
    }

    public getSprite() { //get sprite only return
        return this.sprite;
    }
    
    public keyDownMovement(key: string) {
        if (key === "ArrowLeft") {
            this.arrowLeft = true;
        }

        if (key === "ArrowRight") {
            this.arrowRight = true;
        }
    }
    public keyUpMovement(key: string) {
        if (key === "ArrowLeft") {
            this.arrowLeft = false;
        }

        if (key === "ArrowRight") {
            this.arrowRight = false;
        }
    }
    public addMovement(app: Application) {
        if (this.arrowLeft) {
            this.sprite.x -= this.speed;
        }

        if (this.arrowRight) {
            this.sprite.x += this.speed;
        }

       this.setBoundaries(app);
    }
    private setBoundaries(app: Application) {
        // clamping setting boundaries

        this.sprite.x = Math.max(this.halfWidth, Math.min(app.screen.width - this.halfWidth, this.sprite.x)); 
    }
}