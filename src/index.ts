import "./style.css";
import { Application, Assets, AssetsManifest } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";
import { SpaceShip } from "./SpaceShip";
import { GAME_HEIGHT, GAME_WIDTH, LEVELS } from "./Constants";
import { Bullet } from "./Bullet";
import { Alien } from "./Alien";
import { SheetTexture } from "./SheetTexture";
import {PlayerHealthBar} from "./PlayerHealthBar";
import { StartGameScreen } from "./StartGameScreen";
import { GameOverScreen } from "./GameOverScreen";
import { Game } from "./Game";

console.log(
    `%cPixiJS V8\nTypescript Boilerplate%c ${VERSION} %chttp://www.pixijs.com %c❤️`,
    "background: #ff66a1; color: #FFFFFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
    "color: #D81B60; font-weight: bold;",
    "color: #C2185B; font-weight: bold; text-decoration: underline;",
);

(async () => {
    let app: Application; //It is the main controller of the entire game.
    let bullet: Bullet;
    let spaceShip: SpaceShip;
    let gameOver: boolean;
    let gameLevel: number;
    let game: Game;

    //await window load
    await new Promise((resolve) => {
        window.addEventListener("load", resolve);
    });

    await init();

    async function init(): Promise<void> {
        bullet = new Bullet();
        app = new Application();
        gameLevel = 1;

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

        const startGameScreen = new StartGameScreen();
        const gameOverScreen = new GameOverScreen();
        const healthBar = new PlayerHealthBar();

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

        function startGame() {
            if (startGameScreen.visible) {
                startGameScreen.visible = false;
                game.world.visible = true;
                app.stage.removeChild(startGameScreen);
                gameOver = false;
            }
        }

        function restartGame() {
            if (gameOverScreen.visible) {
                gameOverScreen.visible = false;

                reset();
            }
        }

        startGameScreen.startButton.on("pointerdown", startGame);
        gameOverScreen.restartButton.on("pointerdown", restartGame);

        window.addEventListener("keyup", (e) => {
            spaceShip.keyUpMovement(e.key);
        });

        function triggerExplosion(alien: Alien) {
            const explosion = new SheetTexture();

            const one = alien;

            explosion.position.set(one?.x, one?.y);
            explosion.play();
            game.aliensContainer.addChild(explosion);
        }

        game.world.visible = false;
        gameOverScreen.visible = false;
        startGameScreen.visible = true;

        let enemyShootTimer = 0;
        const enemyShootInterval = 60; //enemy shoot intrval 60fps

        function enemyBulletSystem() {
            enemyShootTimer++;

            if (enemyShootTimer > enemyShootInterval) {
                // has enough time pass

                const shooters: Alien[] = []; // store the shooter enemies into an array

                for (let i = 0; i < game.aliens.length; i++) {
                    // loop trough all the aliens and get alien on position i
                    const alien = game.aliens[i];

                    if (alien == null) continue; // if the picked alien is null (death) continue

                    if (!hasEnemyBelow(i)) {
                        // if we have enemy below we do not push if there is no enemy we push
                        shooters.push(alien);
                    }
                }
                if (shooters.length > 0) {
                    // if we have at least one enemy allowed to shoot
                    const randomShooter = shooters[Math.floor(Math.random() * shooters.length)];

                    bullet.createEnemyBullet(game.aliensContainer, randomShooter);
                    enemyShootTimer = 0;
                }
            }
        }
        function hasEnemyBelow(index: number) {
            // index === i
            const level = LEVELS[gameLevel - 1];

            for (let j = index + level.colLength; j < game.aliens.length; j += level.colLength) {
                if (game.aliens[j] !== null) {
                    return true; // we don't have death alien
                }
            }

            return false;
        }

        function shipEnemyCollision() {
            if (!bullet.shipBullet) return; // check if the bullet is null

            const bulletBounds = bullet.shipBullet.getBounds(); //get the boundaries of the bullet box

            for (let i = 0; i < game.aliens.length; i++) {
                const oneEnemy = game.aliens[i]; // we should know the index to get the alien coordinates because the alien is in an array

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
                    game.aliens[i] = null;
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
                    showGameOver();
                }
            }
        }

        function enemyContainerCollision() {
            const shipBounds = spaceShip.getBounds();

            for (const alien of game.aliens) {
                if (alien === null) continue;

                const alienBounds = alien.getBounds();

                if (alienBounds.bottom >= shipBounds.top) {
                    showGameOver();

                    return; // stops the function after gameover
                }
            }
        }

        function showGameOver() {
            gameOver = true;
            app.stage.addChild(gameOverScreen);
            gameOverScreen.visible = true;
            startGameScreen.visible = false;
            game.world.removeChild(game.aliensContainer);
            game.world.removeChild(spaceShip);
            spaceShip.removeShip();
            window.removeEventListener("keydown", playerFireBullet);
            game.removeAliensGroup();
        }

        app.stage.addChild(game.world); // This is the main container that holds everything in the game. And everything you want to see must be added to the stage.
        app.stage.addChild(startGameScreen);
        game.world.addChild(healthBar);
        game.world.addChild(spaceShip);
        game.createAliensGroup(alienTexture);
        game.world.addChild(game.aliensContainer);

        gameOver = true;

        app.ticker.add(() => {
            if (gameOver) {
                return;
            }

            game.enemiesMovement();
            spaceShip.shipMovement(app);
            bullet.moveShipBullet(game.world);
            bullet.moveEnemyBullet(game.world);
            // enemyBulletSystem();
            shipEnemyCollision();
            enemyContainerCollision();
            enemyPlayerCollision();
        });
    }

    function reset() {
        const shipTexture = Assets.get("ship");

        spaceShip = new SpaceShip(shipTexture, app);

        const alienTexture = Assets.get("alien");

        function playerFireBullet(e: KeyboardEvent) {
            if (gameOver) {
                return;
            }

            spaceShip.keyDownMovement(e.key);
            if (e.code === "Space") {
                bullet.createPlayerBullet(spaceShip, game.world);
            }
        }
        window.addEventListener("keydown", playerFireBullet);

        game.world.addChild(spaceShip);
        game.world.addChild(game.aliensContainer);
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

// трябва ли да се дестройне текстурата на кораба при рестарт
