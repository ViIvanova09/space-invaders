import "./style.css";
import { Application, Assets, AssetsManifest, Container } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";
import { SpaceShip } from "./SpaceShip";
import { GAME_HEIGHT, GAME_WIDTH } from "./Constants";
import { Bullet } from "./Bullet";
import { Alien } from "./Alien";
import { SheetTexture } from "./SheetTexture";

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
    // const aliens: Alien[] = [];
    const aliens: (Alien | null)[] = [];
    const aliensContainer = new Container(); // This container holds all the enemies

    //await window load
    await new Promise((resolve) => {
        window.addEventListener("load", resolve);
    });

    await app.init({ backgroundColor: "#212842", width: GAME_WIDTH, height: GAME_HEIGHT });

    await loadGameAssets();

    async function loadGameAssets(): Promise<void> {
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

        const spaceShip = new SpaceShip(shipTexture, app);

        document.body.appendChild(app.canvas);

        resizeCanvas();

        window.addEventListener("keydown", (e) => {
            spaceShip.keyDownMovement(e.key);

            if (e.code === "Space") {
                bullet.createBullet(spaceShip, world);
            }
        });

        window.addEventListener("keyup", (e) => {
            spaceShip.keyUpMovement(e.key);
        });

        function triggerExplosion(alien: Alien){
            const explosion = new SheetTexture();

            const one = alien

            explosion.position.set(one?.x, one?.y);
            explosion.play();
            aliensContainer.addChild(explosion);
            console.log("possition",  explosion.position.set(one?.x, one?.y));
            
            // explosion.position.set(200, 300);
            // explosion.play();
            // world.addChild(explosion);            
            // console.log("position", explosion.position.set(200,300));
            

        }
  
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 11; col++) {
                const x1 = col * 40; // Spacing horizontally
                const y1 = row * 30; //spacing vertically
                const alien = new Alien(alienTexture, x1, y1);

                aliens.push(alien);
                aliensContainer.addChild(alien);
            }
        }

        aliensContainer.x = 80;
        aliensContainer.y = 60;
        const speed = 1;
        let direction = 1;
        let enemyShootTimer = 0;
        const enemyShootInterval = 60; //enemy shoot intrval 60fps

        function enemiesMovement() {
            const bounds = aliensContainer.getBounds(); //get the boundaries of the aliensContainer

            aliensContainer.x += speed * direction;

            if (aliensContainer.x && bounds.right > GAME_WIDTH) {
                direction = -1;
                aliensContainer.y += 10;
            }

            if (aliensContainer.x && bounds.left < 0) {
                direction = 1;
                aliensContainer.y += 10;
            }
        }
        //   function enemyBulletSystem(){
        // enemyShootTimer++
        //             if(enemyShootTimer > enemyShootInterval){
        //             if(aliens.length > 0){ //
        //             const randomShooter = aliens[Math.floor(Math.random() * aliens.length)]; // 0.5 * 55 = 27.5 -> 27

        //             bullet.createEnemyBullet(aliensContainer, randomShooter);

        //             // bullet.moveEnemyBullet(world);
        //             }

        //             enemyShootTimer = 0
        //         }
        // }

        // function enemyBulletSystem(){

        //     enemyShootTimer++;

        //     if(enemyShootTimer > enemyShootInterval){
        //         if(aliens.some(alien => alien !== null)){ // check if at least one none null alien
        //             let randomShooter = null; // at first we dont know which alien will shoot

        //             while(randomShooter == null) { // while this is true keep searching for alive enemy

        //                 const randCol = Math.floor(Math.random() * 11); //random number between 0 and 10

        //                 console.log("randomcol", randCol + 1);

        //                 for(let i = 4; i >= 0; i--){ // search col from bottom to top decrement

        //                     console.log('index', i);
        //                     console.log('alien', aliens[randCol + (i * 11)], randCol + (i * 11));
        //                     if(aliens[randCol + (i * 11)]){ // random col + rox * 11 if we have alien in this index
        //                         randomShooter = aliens[randCol + (i * 11)]; // chose random one
        //                        break

        //                     }
        //                 }
        //             }
        //         bullet.createEnemyBullet(aliensContainer, randomShooter);

        //         }

        //         enemyShootTimer = 0
        //         }
        //     }
        function enemyBulletSystem() {
            enemyShootTimer++;
            if (enemyShootTimer > enemyShootInterval) {
                // has enough time pass

                const shooters: Alien[] = []; // store the shooter enemies into an array

                for (let i = 0; i < aliens.length; i++) {
                    // loop trough all the aliens and get alien on position i
                    const alien = aliens[i];

                    if (alien == null) continue; // if the picked alien is null (death) continue

                    if (!hasEnemyBelow(i)) {
                        // if we have enemy below we do not push if there is no enemy we push
                        shooters.push(alien);
                    }
                }
                if (shooters.length > 0) {
                    // if we have at least one enemy allowed to shoot
                    const randomShooter = shooters[Math.floor(Math.random() * shooters.length)];

                    bullet.createEnemyBullet(aliensContainer, randomShooter);
                    enemyShootTimer = 0;
                }
            }
        }
        function hasEnemyBelow(index: number) {
            // index === i
            for (let j = index + 11; j < aliens.length; j += 11) {
                if (aliens[j] !== null) {
                    return true; // we don't have death alien
                }
            }

            return false;
        }

        function shipEnemyCollision() {
            if (!bullet.shipBullet) return; // check if the bullet is null

            const bulletBounds = bullet.shipBullet.getBounds(); //get the boundaries of the bullet box

            for (let i = 0; i < aliens.length; i++) {
                const oneEnemy = aliens[i]; // we should know the index to get the alien coordinates because the alien is in an array

                // console.log(oneEnemy == null);

                if (oneEnemy == null) continue;

                const aliensBounds = oneEnemy.getBounds(); //get the boundaries of the alien box

                if (
                    bulletBounds.maxX > aliensBounds.minX &&
                    aliensBounds.maxX > bulletBounds.minX && // this is an interpretation of aabb formula for collision in 2d games
                    bulletBounds.maxY > aliensBounds.minY &&
                    bulletBounds.minY < aliensBounds.maxY
                ) {
                    triggerExplosion(oneEnemy);
                    aliensContainer.removeChild(oneEnemy);
                    aliens[i] = null;
                    world.removeChild(bullet.shipBullet);
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
                    world.removeChild(spaceShip);
                    spaceShip.removeShip();
                }
            }
        }
        app.stage.addChild(world); // This is the main container that holds everything in the game. And everything you want to see must be added to the stage.

        world.addChild(spaceShip);
        world.addChild(aliensContainer);

        app.ticker.add(() => {
            // enemiesMovement();
            // enemyBulletSystem();
            shipEnemyCollision();
            enemyPlayerCollision();

            spaceShip.shipMovement(app);
            bullet.moveShipBullet(world);
            bullet.moveEnemyBullet(world);
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
