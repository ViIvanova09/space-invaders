import { Application, Texture } from "pixi.js";
import { GameElements } from "./GameElements";

export class SpaceShip extends GameElements {
    arrowLeft;
    arrowRight;
    speed;
    halfWidth;

    constructor(texture: Texture, app: Application) {
        super(texture, app.screen.width / 2, app.screen.height - 10); //calls the gameElements constructor

        this.position.set(this.x, this.y); //x=480, y=530

        this.arrowLeft = false;
        this.arrowRight = false;
        this.speed = 5;

        this.halfWidth = this.width / 2;
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
            this.x -= this.speed;
        }

        if (this.arrowRight) {
            this.x += this.speed;
        }

        this.setBoundaries(app);
    }
    private setBoundaries(app: Application) {
        // clamping setting boundaries

        this.x = Math.max(this.halfWidth, Math.min(app.screen.width - this.halfWidth, this.x));
    }
}
