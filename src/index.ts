import "./style.css";
import { Application, Assets, AssetsManifest } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";

import { getSpine } from "./utils/spine-example";
import { createBird } from "./utils/create-bird";
import { addSpaceShip } from "./utils/space-ship";


const gameWidth = 1280;
const gameHeight = 720;

console.log(
    `%cPixiJS V8\nTypescript Boilerplate%c ${VERSION} %chttp://www.pixijs.com %c❤️`,
    "background: #ff66a1; color: #FFFFFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
    "color: #D81B60; font-weight: bold;",
    "color: #C2185B; font-weight: bold; text-decoration: underline;",
    //     "color: #ff66a1;",
);

(async () => {
    const app = new Application();

    //await window load
    await new Promise((resolve) => {
        window.addEventListener("load", resolve);
    });

    await app.init({ backgroundColor: "#212842", width: gameWidth, height: gameHeight });

    await loadGameAssets();

    async function loadGameAssets(): Promise<void> {
        
        const manifest = {
            bundles: [
                { name: "bird", assets: [{ alias: "bird", src: "./assets/simpleSpriteSheet.json" }] },
                {
                    name: "spineboyData",
                    assets: [{ alias: "spineboyData", src: "./assets/spine-assets/spineboy-pro.skel" }],
                },
                {
                    name: "spineboyAtlas",
                    assets: [{ alias: "spineboyAtlas", src: "./assets/spine-assets/spineboy-pma.atlas" }],
                },
            ],
        }satisfies AssetsManifest;

        await Assets.init({ manifest });
        await Assets.loadBundle(["bird", "spineboyData", "spineboyAtlas", "pixieData", "pixieAtlas"]);
        await Assets.load(['assets/spaceShip.png']);

        document.body.appendChild(app.canvas);

        resizeCanvas();

        const birdFromSprite = createBird();
        const spaceShip = addSpaceShip();

        const spineExample = await getSpine();
    
        app.stage.addChild(birdFromSprite);
        app.stage.addChild(spaceShip);
        app.stage.addChild(spineExample);

    }

    function resizeCanvas(): void {
        const resize = () => {


            const scale = Math.min(window.innerHeight / gameHeight,
                window.innerWidth / gameWidth)

            app.renderer.resize(window.innerWidth, window.innerHeight);

                app.stage.scale.set(scale);
                app.stage.x = (window.innerWidth - gameWidth * scale) / 2;
                app.stage.y = (window.innerHeight - gameHeight * scale) / 2;
        };

        resize();

        window.addEventListener("resize", resize);
    }
})();