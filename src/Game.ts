import { Container, Texture } from "pixi.js";
import { GAME_WIDTH, LEVELS } from "./Constants";
import { Alien } from "./Alien";
import { Bullet } from "./Bullet";
export class Game {
    aliensContainer: Container;
    aliens: (Alien | null)[];
    bullet: Bullet;
    gameLevel: number;
    direction: number;
    currentLevel: typeof LEVELS[number];

    world: Container; // // This is the main container that holds everything in the game. And everything you want to see must be added to the stage

    constructor() {
        this.aliensContainer = new Container();
        this.aliens = [];
        this.bullet = new Bullet();
        this.gameLevel = 1;
        this.world = new Container();
        this.direction = 1;
        this.currentLevel = LEVELS[this.gameLevel - 1];

        this.world.addChild(this.aliensContainer);
    }
    public createAliensGroup(alienTexture: Texture) {
        this.aliensContainer.x = 80;
        this.aliensContainer.y = 95;
        // const level = LEVELS[this.gameLevel - 1];

        for (let row = 0; row < this.currentLevel.rowLength; row++) {
            for (let col = 0; col < this.currentLevel.colLength; col++) {
                const x1 = col * 40; // Spacing horizontally
                const y1 = row * 30; //spacing vertically
                const alien = new Alien(alienTexture, x1, y1);

                this.aliens.push(alien);
                this.aliensContainer.addChild(alien);
            }
        }
    }
    public enemiesMovement() {
        const bounds = this.aliensContainer.getBounds(); //get the boundaries of the aliensContainer

        this.aliensContainer.x += this.currentLevel.speed * this.direction;

        if (this.aliensContainer.x && bounds.right > GAME_WIDTH) {
            this.direction = -1;
            this.aliensContainer.y += 10;
        }

        if (this.aliensContainer.x && bounds.left < 0) {
            this.direction = 1;
            this.aliensContainer.y += 10;
        }
    }
    public removeAliensGroup() {
        this.aliens.forEach((alien) => {
            alien?.destroy();
        });
        this.aliens = [];
    }
}
