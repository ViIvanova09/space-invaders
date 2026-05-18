import { Container, Graphics, Text, TextStyle } from "pixi.js";
import {GAME_HEIGHT, GAME_WIDTH} from "./Constants"

export class StartGameScreen extends Container {
    title: Text;
    button: Graphics;
    titleStyle: TextStyle;
    // buttonText: Text;
    constructor(){
        super()
        this.titleStyle = new TextStyle({
            fontFamily: 'Courier New',
            fontSize: 50,
            fill: '#00ff00',
            fontWeight: 'bold',
            align: 'center'
        });
       this.title = new Text ({
            text: "Space Invaders", style: this.titleStyle 
        })
       
        this.button = new Graphics()
            .rect(0, 0, 200, 80)


            this.title.x = GAME_WIDTH / 2 - 170;
            this.title.y = GAME_HEIGHT / 2 - 100;
            this.addChild(this.title)
    }
}