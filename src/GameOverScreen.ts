import { Application, Container, Text } from "pixi.js";

export class GameOverScreen extends Container {
    title: Text;
    subtitle: Text;
    constructor(app: Application){
        super()
        this.title = new Text ({
            text: "Game Over!",
            style: {
                fontFamily: "Arial",
                fontSize: 24,
                fill: 0xff1010,
                align: "center",
            },
        })
        this.subtitle = new Text ({
            text: "Press 'R' to restart",
            style: {
                fontFamily: "Arial",
                fontSize: 24,
                fill: 0xff1010,
                align: "center",
            },
        })

        this.title.anchor.set(0.5);
        this.title.x = app.screen.width / 2;
        this.title.y = app.screen.height / 2 - 50;
        this.subtitle.anchor.set(0.5);
        this.subtitle.x = app.screen.width / 2;
        this.subtitle.y = app.screen.height / 2 - 70;
        
        this.addChild(this.title)
        this.addChild(this.subtitle)
    }
}