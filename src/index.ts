import "./style.css";
import { Application, Assets, AssetsManifest, Container } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";

import { createBird } from "./utils/create-bird";
import { addMovment, addSpaceShip } from "./utils/space-ship";
import { GAME_HEIGHT, GAME_WIDTH } from "./utils/constants";
import { addBullets, shootingBullets } from "./utils/bullets";

console.log(
    `%cPixiJS V8\nTypescript Boilerplate%c ${VERSION} %chttp://www.pixijs.com %c❤️`,
    "background: #ff66a1; color: #FFFFFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
    "color: #D81B60; font-weight: bold;",
    "color: #C2185B; font-weight: bold; text-decoration: underline;",
    //     "color: #ff66a1;",
);

(async () => {
    const app = new Application();

    const world = new Container();

    //await window load
    await new Promise((resolve) => {
        window.addEventListener("load", resolve);
    });

    await app.init({ backgroundColor: "#212842", width: GAME_WIDTH, height: GAME_HEIGHT });

    await loadGameAssets();

    async function loadGameAssets(): Promise<void> {
        const manifest = {
            bundles: [{ name: "bird", assets: [{ alias: "bird", src: "./assets/simpleSpriteSheet.json" }] }],
        } satisfies AssetsManifest;

        await Assets.init({ manifest });
        await Assets.loadBundle(["bird", "pixieData", "pixieAtlas"]);
        await Assets.load(["assets/spaceShip.png"]);

        document.body.appendChild(app.canvas);

        resizeCanvas();

        const birdFromSprite = createBird();
        const spaceShip = addSpaceShip();
        
        let shooting = true;

        window.addEventListener("keydown", (e) => {
            if (e.code === "Space" && shooting) {
                addBullets(spaceShip, app);
                shooting = false;
                setTimeout(() => {
                    shooting = true;
                }, 200);
            }
        });
        app.stage.addChild(world);
        world.addChild(birdFromSprite);
        world.addChild(spaceShip);

        app.ticker.add(() => {
            addMovment(spaceShip);
            shootingBullets();
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
