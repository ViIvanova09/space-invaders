import { Container, Graphics, Text } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./Constants";

export class GameOverScreen extends Container {
    restartButton: Graphics;
    title: Text;
    subtitle: Text;
    constructor(){
        super()
        this.restartButton = new Graphics()
            .rect(0, 0, 200, 80)
            .fill({color: 0xff1010, alpha: 0.5})
        this.title = new Text ({
            text: "Game Over!",
            style: {
                fontFamily: "Arial",
                fontSize: 53,
                fill: 0xFF0000,
                align: "center",
            },
        })
        this.subtitle = new Text ({
            text: "Click to restart",
            style: {
                fontFamily: "Arial",
                fontSize: 23,
                fill: 0x000000,
                align: "center",
            },
        })
        
        this.restartButton.x = GAME_WIDTH / 2 - 100;
        this.restartButton.y = GAME_HEIGHT / 2 - 90;
        this.restartButton.interactive = true;
        this.restartButton.cursor = "pointer"
        this.title.anchor.set(0.5);
        this.title.x = GAME_WIDTH / 2;
        this.title.y = GAME_HEIGHT / 2 - 160;
        this.subtitle.anchor.set(0.5);
        this.subtitle.x = GAME_WIDTH / 2;
        this.subtitle.y = GAME_HEIGHT / 2 - 50;
        
     
        this.addChild(this.restartButton)
        this.addChild(this.title)
        this.addChild(this.subtitle)
    }
}