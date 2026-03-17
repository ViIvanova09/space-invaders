import "./style.css";
import { Application, Assets, AssetsManifest, Container } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";

import { addMouseMovement, addMovement, addSpaceShip } from "./utils/space-ship";
import { GAME_HEIGHT, GAME_WIDTH } from "./utils/constants";
import { addBullets, shootingBullets } from "./utils/bullets";

console.log(
    `%cPixiJS V8\nTypescript Boilerplate%c ${VERSION} %chttp://www.pixijs.com %c❤️`,
    "background: #ff66a1; color: #FFFFFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
    "color: #D81B60; font-weight: bold;",
    "color: #C2185B; font-weight: bold; text-decoration: underline;",
);

(async () => {
    const app = new Application(); //It is the main controller of the entire game.

    const world = new Container(); //

    //await window load
    await new Promise((resolve) => {
        window.addEventListener("load", resolve);
    });

    await app.init({ backgroundColor: "#212842", width: GAME_WIDTH, height: GAME_HEIGHT });

    await loadGameAssets();

    async function loadGameAssets(): Promise<void> {
        const manifest = {
            bundles: [{ name: "space-ship", assets: [{ alias: "ship", src: "assets/spaceShip.png" }] }],
        } satisfies AssetsManifest;

        await Assets.init({ manifest });
        await Assets.loadBundle(["space-ship", "pixieData", "pixieAtlas"]);
        // await Assets.load(["assets/spaceShip.png"]);

        document.body.appendChild(app.canvas);

        resizeCanvas();

        const spaceShip = addSpaceShip();
        let canShoot = true;

        window.addEventListener("keydown", (e) => {
            if (e.code === "Space" && canShoot) {
                addBullets(spaceShip, world); // calls the function
                canShoot = false;
                setTimeout(() => {
                    canShoot = true;
                }, 700);
            }
        });

        app.stage.eventMode = "static";
        let mouseX = 0;

        app.stage.on("globalpointermove", (e) => { // check the pixi documentation
            mouseX = e.global.x;
        });
        app.stage.addChild(world); // This is the main container that holds everything in the game. And everything you want to see must be added to the stage.
        world.addChild(spaceShip);

        app.ticker.add(() => {
            addMovement(spaceShip);
            shootingBullets(world);
            addMouseMovement(spaceShip, mouseX);
        });
    }

    function resizeCanvas(): void {
        const resize = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            app.renderer.resize(screenWidth, screenHeight);

            const scale = Math.min(screenWidth / GAME_WIDTH, screenHeight / GAME_HEIGHT);

            world.scale.set(scale);

            world.x = (screenWidth - GAME_WIDTH * scale) / 2;
            world.y = (screenHeight - GAME_HEIGHT * scale) / 2;
        };

        resize();

        window.addEventListener("resize", resize);
    }
})();
