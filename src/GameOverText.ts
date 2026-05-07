import { Application, Text } from "pixi.js";

// export class GameOverText extends Container {
//     title: Text;
//     subtitle: Text;
//     constructor(app: Application){
//         super()
//         this.title = new Text ({
//             text: "Game Over!",
//             style: {
//                 fontFamily: "Arial",
//                 fontSize: 24,
//                 fill: 0xff1010,
//                 align: "center",
//             },
//         })
//         this.subtitle = new Text ({
//             text: "Press 'R' to restart",
//             style: {
//                 fontFamily: "Arial",
//                 fontSize: 24,
//                 fill: 0xff1010,
//                 align: "center",
//             },
//         })

//         this.title.anchor.set(0.5);
//         this.title.x = app.screen.width / 2;
//         this.title.y = app.screen.height / 2 - 50;
//         this.subtitle.anchor.set(0.5);
//         this.subtitle.x = app.screen.width / 2;
//         this.subtitle.y = app.screen.height / 2 - 70;

//         console.log('title', this.title);
        

//     }
// }

export class GameOverText extends Text {
    constructor(app: Application){
        super({
            text: "Game over!\n Press 'R' to restart",
            style: {
                fontFamily: "Arial",
                fontSize: 24,
                fill: 0xff1010,
                align: "center",
            }
        })
            this.anchor.set(0.5);
            this.x = app.screen.width / 2;
            this.y = app.screen.height / 2 - 50;
    }
}