import { Container, Graphics, Text } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./Constants";

export class GameOverScreen extends Container {
    button: Graphics;
    title: Text;
    subtitle: Text;
    constructor(){
        super()
        this.button = new Graphics()
            .rect(0, 0, 200, 80)
            .fill({color: 0xff1010, alpha: 0.5})
        this.title = new Text ({
            text: "Game Over!",
            style: {
                fontFamily: "Arial",
                fontSize: 23,
                fill: 0x000000,
                align: "center",
            },
        })
        this.subtitle = new Text ({
            text: "Press to restart",
            style: {
                fontFamily: "Arial",
                fontSize: 23,
                fill: 0x000000,
                align: "center",
            },
        })
        
        this.button.x = GAME_WIDTH / 2 - 100;
        this.button.y = GAME_HEIGHT / 2 - 90;
        this.button.interactive = true;
        this.button.cursor = "pointer"
        this.title.anchor.set(0.5);
        this.title.x = GAME_WIDTH / 2;
        this.title.y = GAME_HEIGHT / 2 - 60;
        this.subtitle.anchor.set(0.5);
        this.subtitle.x = GAME_WIDTH / 2;
        this.subtitle.y = GAME_HEIGHT / 2 - 40;
        
     
        this.addChild(this.button)
        this.addChild(this.title)
        this.addChild(this.subtitle)
    }
}