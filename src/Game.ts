import { Container, Texture } from "pixi.js";
import { LEVELS } from "./Constants";
import { Alien } from "./Alien";

export class Game {
    aliensContainer: Container;
    aliens: (Alien | null)[];
    gameLevel: number;
    
    world: Container;  // // This is the main container that holds everything in the game. And everything you want to see must be added to the stage
    
    constructor() {

        this.aliensContainer = new Container();
        this.aliens = [];
        this.gameLevel = 2;
        this.world = new Container();
        
        this.world.addChild(this.aliensContainer);

    }

    public createAliensGroup(alienTexture: Texture) {
        this.aliensContainer.x = 80;
        this.aliensContainer.y = 60;
        const level = LEVELS[this.gameLevel - 1];
        


        for (let row = 0; row < level.rowLength; row++) {
            for (let col = 0; col < level.colLength; col++) {
                const x1 = col * 40; // Spacing horizontally
                const y1 = row * 30; //spacing vertically
                const alien = new Alien(alienTexture, x1, y1);

                this.aliens.push(alien);
                this.aliensContainer.addChild(alien);
            }
        }
    }
}
