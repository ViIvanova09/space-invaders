import "./style.css";
import { Application, Assets, AssetsManifest, Container } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";
import { SpaceShip } from "./SpaceShip";
import { GAME_HEIGHT, GAME_WIDTH } from "./Constants";
import { Bullet } from "./Bullet";
import { Alien } from "./Alien";

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
    const aliens: Alien[] = [];
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
            ],
        } satisfies AssetsManifest;

        await Assets.init({ manifest });
        await Assets.loadBundle(["space-ship", "alien", "pixieData", "pixieAtlas"]);
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

        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 11; col++) {
                const x1 = col * 40; // Spacing horizontally
                const y1 = row * 30; //spacing vertically
                const alien = new Alien(alienTexture, x1, y1);

                aliens.push(alien);
                aliensContainer.addChild(alien);
            }
        }
     
        // console.log("length",aliens.length); // 55
        
        //  const alien = new Alien(alienTexture, 300, 100);

        //  aliens.push(alien);
        // aliensContainer.addChild(alien);
      
        
        aliensContainer.x = 80;
        aliensContainer.y = 60;
        const speed = 1;
        let direction = 1;
        let enemyShootTimer = 0;
        const enemyShootInterval = 60;


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

        function enemyBulletSystem(){

            enemyShootTimer++;

            if(enemyShootTimer > enemyShootInterval){
                if(aliens.length > 0){ // 
                const randomShooter = aliens[Math.floor(Math.random() * aliens.length)]; // 0.5 * 55 = 27.5 -> 27

           
                // const possitionRandomX = randomShooter.x
                // const possitionRandomY = randomShooter.y

                // console.log(possitionRandomX, possitionRandomY);
                
                bullet.createEnemyBullet(aliensContainer, randomShooter);

                // bullet.moveEnemyBullet(world);
                }

                enemyShootTimer = 0
            }         
        }
        function checkCollision() {
            if (!bullet.shipBullet) return; // check if the bullet is null 

            const bulletBounds = bullet.shipBullet.getBounds(); //get the boundaries of the bullet box 
            
            for(let i = 0; i < aliens.length; i++){
                const oneEnemy = aliens[i]; // we should know the index to get the alien coordinates because the alien is in an array
                const aliensBounds = oneEnemy.getBounds();//get the boundaries of the alien box

                if(bulletBounds.maxX > aliensBounds.minX && aliensBounds.maxX > bulletBounds.minX &&  // this is an interpretation of aabb formula for collision in 2d games  
                    bulletBounds.maxY > aliensBounds.minY && bulletBounds.minY < aliensBounds.maxY) {

                    aliensContainer.removeChild(oneEnemy);
                    aliens.splice(i, 1);
                    world.removeChild(bullet.shipBullet);
                    bullet.shipBullet = null;
                    
                    return
                    
                    }
                 }
            }


        app.stage.addChild(world); // This is the main container that holds everything in the game. And everything you want to see must be added to the stage.

        world.addChild(spaceShip);
        world.addChild(aliensContainer);

        app.ticker.add(() => {

            enemiesMovement();
            enemyBulletSystem();
            checkCollision();

            spaceShip.shipMovement(app);
            bullet.moveBullet(world);
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
