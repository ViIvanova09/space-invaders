import "./style.css";
import { Application, Assets, AssetsManifest, Container } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";

import { SpaceShip} from "./utils/space-ship";
import { GAME_HEIGHT, GAME_WIDTH } from "./utils/constants";
import { Bullet } from "./utils/bullet";
import {Alien} from "./utils/alien";

console.log(
    `%cPixiJS V8\nTypescript Boilerplate%c ${VERSION} %chttp://www.pixijs.com %c❤️`,
    "background: #ff66a1; color: #FFFFFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
    "color: #D81B60; font-weight: bold;",
    "color: #C2185B; font-weight: bold; text-decoration: underline;",
);

(async () => {
    const app = new Application(); //It is the main controller of the entire game.
    const world = new Container(); // // This is the main container that holds everything in the game. And everything you want to see must be added to the stage
    const bullet = new Bullet();
    // const aliensContainer = new Container();
    

   

    //await window load
    await new Promise((resolve) => {
        window.addEventListener("load", resolve);
    });

    await app.init({ backgroundColor: "#212842", width: GAME_WIDTH, height: GAME_HEIGHT });

    await loadGameAssets();

    async function loadGameAssets(): Promise<void> {
        const manifest = {
            bundles: [{ name: "space-ship", assets: [{ alias: "ship", src: "assets/spaceShip.png" }] }, 
            { name: "alien", assets: [{ alias: "alien", src: "assets/alien.png" }] }],
        } satisfies AssetsManifest;

        await Assets.init({ manifest });
        await Assets.loadBundle(["space-ship", "alien", "pixieData", "pixieAtlas"]);

        const spaceShip = new SpaceShip(app);
        const alien = new Alien(app);

        document.body.appendChild(app.canvas);

       

        resizeCanvas();
     

        window.addEventListener("keydown", (e) => {
                spaceShip.keyDownMovement(e.key);

            if (e.code === "Space") { 
                bullet.createBullet(spaceShip.getSprite(), world)
            }
        });

        window.addEventListener("keyup", (e) => {
            spaceShip.keyUpMovement(e.key);
        });

        app.stage.addChild(world); // This is the main container that holds everything in the game. And everything you want to see must be added to the stage.

        world.addChild(spaceShip.getSprite()); 
        world.addChild(alien.getSprite());

        app.ticker.add(() => { /// check if i can add ticker into the classes 
            spaceShip.addMovement(app);
            bullet.moveBullet(world)
        });
    }

    function resizeCanvas(): void {
        const resize = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            app.renderer.resize(screenWidth, screenHeight);

            const scale = Math.min(screenWidth / app.screen.width, screenHeight / app.screen.height);

            world.scale.set(scale);

            world.x = (screenWidth - app.screen.width * scale) / 2;
            world.y = (screenHeight - app.screen.height * scale) / 2;
        };

        resize();

        window.addEventListener("resize", resize);
    }
})();
