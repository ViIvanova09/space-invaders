import "./style.css";
import { Application, Assets, AssetsManifest, Container } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";
import { SpaceShip } from "./SpaceShip";
import { GAME_HEIGHT, GAME_WIDTH } from "./Constants";
import { Bullet } from "./Bullet";
import { Alien } from "./Alien";
import { SheetTexture } from "./SheetTexture";
import { GameOverScreen } from "./GameOverScreen";
import {Game} from "./Game"

console.log(
    `%cPixiJS V8\nTypescript Boilerplate%c ${VERSION} %chttp://www.pixijs.com %c❤️`,
    "background: #ff66a1; color: #FFFFFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
    "color: #D81B60; font-weight: bold;",
    "color: #C2185B; font-weight: bold; text-decoration: underline;",
);

(async () => {
    // let world: Container; 
    let app: Application; //It is the main controller of the entire game.
    let bullet: Bullet;
    let aliens: (Alien | null)[];
    let aliensContainer: Container; // This container holds all the enemies
    let spaceShip: SpaceShip;
    let gameOver: boolean;
    // let gameLevel: number;
    let game: Game;

    //await window load
    await new Promise((resolve) => {
        window.addEventListener("load", resolve);
    });

    await init();

    async function init(): Promise<void> {
        bullet = new Bullet();
        aliens = [];
        aliensContainer = new Container();
        app = new Application();
        // world = new Container();

        await app.init({ backgroundColor: "#212842", width: GAME_WIDTH, height: GAME_HEIGHT });

        const manifest = {
            bundles: [
                { name: "space-ship", assets: [{ alias: "ship", src: "assets/spaceShip.png" }] },
                { name: "alien", assets: [{ alias: "alien", src: "assets/alien.png" }] },
                { name: "spritesheet", assets: [{ alias: "spritesheet", src: "assets/spritesheet.json" }] },
            ],
        } satisfies AssetsManifest;

        await Assets.init({ manifest });
        await Assets.loadBundle(["space-ship", "alien", "pixieData", "pixieAtlas", "spritesheet"]);
        const shipTexture = Assets.get("ship");
        const alienTexture = Assets.get("alien");

        game = new Game();
        const gameOverScreen = new GameOverScreen(app);

        spaceShip = new SpaceShip(shipTexture, app);
       
        document.body.appendChild(app.canvas);

        resizeCanvas();

        function playerFireBullet(e: KeyboardEvent) {
            spaceShip.keyDownMovement(e.key);
            if (e.code === "Space") {
                bullet.createPlayerBullet(spaceShip, game.world);
            }
        }
        window.addEventListener("keydown", playerFireBullet);

        function restartGame(e: KeyboardEvent) {
            if (e.key === "r" && gameOverScreen.visible) {
                gameOverScreen.visible = false;
                reset();
            }
        }
        window.addEventListener("keydown", restartGame);

        window.addEventListener("keyup", (e) => {
            spaceShip.keyUpMovement(e.key);
        });

        function triggerExplosion(alien: Alien) {
            const explosion = new SheetTexture();

            const one = alien;

            explosion.position.set(one?.x, one?.y);
            explosion.play();
            aliensContainer.addChild(explosion);
        }
        
      
        // let enemyShootTimer = 0;
        // const enemyShootInterval = 60; //enemy shoot intrval 60fps

        gameOverScreen.visible = false;
        

      

        // function enemyBulletSystem() {
        //     enemyShootTimer++;

        //     // if (gameOver) {
        //     //     return;
        //     // }

        //     if (enemyShootTimer > enemyShootInterval) {
        //         // has enough time pass

        //         const shooters: Alien[] = []; // store the shooter enemies into an array

        //         for (let i = 0; i < aliens.length; i++) {
        //             // loop trough all the aliens and get alien on position i
        //             const alien = aliens[i];

        //             if (alien == null) continue; // if the picked alien is null (death) continue

        //             if (!hasEnemyBelow(i)) {
        //                 // if we have enemy below we do not push if there is no enemy we push
        //                 shooters.push(alien);
        //             }
        //         }
        //         if (shooters.length > 0) {
        //             // if we have at least one enemy allowed to shoot
        //             const randomShooter = shooters[Math.floor(Math.random() * shooters.length)];

        //             bullet.createEnemyBullet(aliensContainer, randomShooter);
        //             enemyShootTimer = 0;
        //         }
        //     }
        // }
        // function hasEnemyBelow(index: number) {
        //     // index === i
        //     for (let j = index + 11; j < aliens.length; j += 11) {
        //         if (aliens[j] !== null) {
        //             return true; // we don't have death alien
        //         }
        //     }

        //     return false;
        // }

        function shipEnemyCollision() {
            // console.log("check collision");
            
            if (!bullet.shipBullet) return; // check if the bullet is null

            const bulletBounds = bullet.shipBullet.getBounds(); //get the boundaries of the bullet box

            for (let i = 0; i < aliens.length; i++) {
                const oneEnemy = aliens[i]; // we should know the index to get the alien coordinates because the alien is in an array

                if (oneEnemy == null) continue;

                const aliensBounds = oneEnemy.getBounds(); //get the boundaries of the alien box

                if (
                    bulletBounds.maxX > aliensBounds.minX &&
                    aliensBounds.maxX > bulletBounds.minX && // this is an interpretation of aabb formula for collision in 2d games
                    bulletBounds.maxY > aliensBounds.minY &&
                    bulletBounds.minY < aliensBounds.maxY
                ) {
                    triggerExplosion(oneEnemy);
                    game.aliensContainer.removeChild(oneEnemy);
                    aliens[i] = null;
                    game.world.removeChild(bullet.shipBullet);
                    bullet.shipBullet = null;

                    return;
                }
            }
        }

        function enemyPlayerCollision() {
            for (let i = 0; i < bullet.alienBullets.length; i++) {
                const enemyBulletBounds = bullet.alienBullets[i].getBounds();
                const shipBounds = spaceShip.getBounds();

                if (
                    enemyBulletBounds.maxX > shipBounds.minX &&
                    shipBounds.maxX > enemyBulletBounds.minX && // this is an interpretation of aabb formula for collision in 2d games
                    enemyBulletBounds.maxY > shipBounds.minY &&
                    enemyBulletBounds.minY < shipBounds.maxY
                ) {
                    game.world.removeChild(spaceShip);
                    spaceShip.removeShip();
                    window.removeEventListener("keydown", playerFireBullet);
                    showGameOver();
                    console.log("shoot", bullet.alienBullets);
                }
            }
        }

        function showGameOver() {
            gameOverScreen.visible = true;
            game.world.removeChild(aliensContainer);
            gameOver = true;
        }
        game.world.addChild(game.aliensContainer);
        app.stage.addChild(game.world); // This is the main container that holds everything in the game. And everything you want to see must be added to the stage.
        app.stage.addChild(gameOverScreen);
        game.createAliensGroup(alienTexture);
        game.world.addChild(spaceShip);
        game.world.addChild(aliensContainer);
        gameOver = false;

        app.ticker.add(() => {
            // enemiesMovement();
            game.enemyBulletSystem();
            shipEnemyCollision();
            enemyPlayerCollision();

            spaceShip.shipMovement(app);
            bullet.moveShipBullet(game.world);
            bullet.moveEnemyBullet(game.world);
        });
    }

    function reset() {
        aliens = [];
        aliensContainer = new Container();
        const shipTexture = Assets.get("ship");

        spaceShip = new SpaceShip(shipTexture, app);

        const alienTexture = Assets.get("alien");

        function playerFireBullet(e: KeyboardEvent) {
            spaceShip.keyDownMovement(e.key);
            if (e.code === "Space") {
                bullet.createPlayerBullet(spaceShip, game.world);
            }
        }
        window.addEventListener("keydown", playerFireBullet);
        

        game.world.addChild(spaceShip);
        game.world.addChild(aliensContainer);
        game.createAliensGroup(alienTexture);
        gameOver = false;
    }

    function resizeCanvas(): void {
        const resize = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            app.renderer.resize(screenWidth, screenHeight);

            const scale = Math.min(screenWidth / app.screen.width, screenHeight / app.screen.height);

            game.world.scale.set(scale);

            game.world.x = (screenWidth - app.screen.width * scale) / 2;
            game.world.y = (screenHeight - app.screen.height * scale) / 2;
        };

        resize();

        window.addEventListener("resize", resize);
    }
})();

// remove bullets when player is killed (optional explosion when hit player) and check if the ship is destroyed removeEventlistener
// when we are death remove everything from the background and after restart to begin the game
// start and end (reset) function bez hardcoded settimeout
// when aliens container hit ship game over 
