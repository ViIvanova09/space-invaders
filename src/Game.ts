import { Assets, Container, Texture } from "pixi.js";
import { LEVELS } from "./Constants";
import { Alien } from "./Alien";

export class Game {
    aliensContainer: Container;
    aliens: (Alien | null)[];
    gameLevel: number;
    
    world: Container;
    constructor() {

        this.aliensContainer = new Container();
        this.aliens = [];
        this.gameLevel = 1;
        this.world = new Container();

        // const aliensContainer = new Container();
        // const levels = LEVELS[gameLevel - 1];
        this.world.addChild(this.aliensContainer);

    }

    public createAlinesGroup() {
        this.aliensContainer.x = 80;
        this.aliensContainer.y = 60;
        const levels = LEVELS[this.gameLevel - 1];
        


        for (let row = 0; row < levels.rowLength; row++) {
            for (let col = 0; col < levels.colLength; col++) {
                const x1 = col * 40; // Spacing horizontally
                const y1 = row * 30; //spacing vertically
                const alien = new Alien(alienTexture, x1, y1);

                this.aliens.push(alien);
                this.aliensContainer.addChild(alien);
            }
        }
    }
}
