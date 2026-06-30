import { Container, Graphics, Text } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./Constants";

export class VictoryScreen extends Container {
    restartButton: Graphics;
    victoryText: Text;

    constructor() {
        super();
        this.restartButton = new Graphics().rect(0, 0, 200, 80).fill({ color: 0xff1010, alpha: 0.5 });
        this.victoryText = new Text({
            text: "Victory!",
            style: {
                fontFamily: "Arial",
                fontSize: 53,
                fill: 0xff0000,
                align: "center",
            },
        });
        this.victoryText.x = GAME_WIDTH / 2;
        this.victoryText.y = GAME_HEIGHT / 2 - 160;
        this.addChild(this.victoryText);
    }
}
