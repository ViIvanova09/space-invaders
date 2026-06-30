import { Container, Text } from "pixi.js";

export class Score extends Container {
    textScore: Text;
    scoreNumber: number;
    playerPoints: number;

    constructor() {
        super();
        this.scoreNumber = 0;
        this.playerPoints = 10;
        this.textScore = new Text({
            text: `Score: 0`,
            style: {
                fontSize: 24,
                fill: 0xffffff,
            },
        });
        this.addChild(this.textScore);
    }
    public addScore(){
        this.scoreNumber += this.playerPoints;
        this.textScore.text = `Score: ${this.scoreNumber}`;
    }
    public clearScore(){
        this.scoreNumber = 0;
        this.textScore.text = `Score: ${this.scoreNumber}`
    }
}
