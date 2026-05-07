import {Application, Text} from 'pixi.js';


export class GameOverText extends Text {
    constructor(app: Application){

        super({
            text: "Game Over!\nPress 'R' to restart",
            style: {
                fontFamily: "Arial",
                fontSize: 24,
                fill: 0xff1010,
                align: "center",
            },
        })
        this.anchor.set(0.5);
        this.x = app.screen.width / 2;
        this.y = app.screen.height / 2 - 50;
    }
}