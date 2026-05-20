import { Container, Graphics, Text, TextStyle } from "pixi.js";
import {GAME_HEIGHT, GAME_WIDTH} from "./Constants"

export class StartGameScreen extends Container {
    title: Text;
    startButton: Graphics;
    titleStyle: TextStyle;
    buttonText: Text;
    constructor(){
        super()
        this.titleStyle = new TextStyle({
            fontFamily: 'Courier New',
            fontSize: 50,
            fill: 0xfff000,
            fontWeight: 'bold',
            align: 'center'
        });
       this.title = new Text ({
            text: "Space Invaders", style: this.titleStyle 
        })
       
        this.startButton = new Graphics()
            .rect(0, 0, 200, 80)
            .fill({color: 0x7851a9, alpha: 0.5})

        this.buttonText =  new Text ({
            text: "Click to start",
            style: {
                fontFamily: "Arial",
                fontSize: 23,
                fill: 0xffffff,
                align: "center",
            },
        })
            this.startButton.x = GAME_WIDTH / 2 - 100;
            this.startButton.y = GAME_HEIGHT / 2;
            this.startButton.interactive = true;
            this.startButton.cursor = "pointer"
            this.title.x = GAME_WIDTH / 2 - 210;
            this.title.y = GAME_HEIGHT / 2 - 190;
            this.buttonText.x = GAME_WIDTH / 2 - 65;
            this.buttonText.y = GAME_HEIGHT / 2 + 25;

            this.addChild(this.title)
            this.addChild(this.startButton)
            this.addChild(this.buttonText)
           
    }
}