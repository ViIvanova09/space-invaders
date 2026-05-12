import { Container, Texture } from "pixi.js";
import { GAME_WIDTH, LEVELS } from "./Constants";
import { Alien } from "./Alien";
import { Bullet } from "./Bullet";
export class Game {
    aliensContainer: Container;
    aliens: (Alien | null)[];
    bullet: Bullet;
    gameLevel: number;
    speed: number;
    direction: number;
    enemyShootTimer: number;
    enemyShootInterval: number;

    world: Container; // // This is the main container that holds everything in the game. And everything you want to see must be added to the stage

    constructor() {
        this.aliensContainer = new Container();
        this.aliens = [];
        this.bullet = new Bullet();
        this.gameLevel = 1;
        this.world = new Container();
        this.speed = 1;
        this.direction = 1;
        this.enemyShootTimer = 0;
        this.enemyShootInterval = 60; //enemy shoot intrval 60fps

    }

    public createAliensGroup(alienTexture: Texture) {
        this.aliensContainer.x = 80;
        this.aliensContainer.y = 60;
        const level = LEVELS[this.gameLevel - 1];

        for (let row = 0; row < level.rowLength; row++) {
            for (let col = 0; col < level.colLength; col++) {
                const x1 = col * 40; // Spacing horizontally
                const y1 = row * 30; //spacing vertically
                const alien = new Alien(alienTexture, x1, y1);

                this.aliens.push(alien);
                this.aliensContainer.addChild(alien);
            }
        }
    }
    public enemiesMovement() {
        const bounds = this.aliensContainer.getBounds(); //get the boundaries of the aliensContainer

        this.aliensContainer.x += this.speed * this.direction;

        if (this.aliensContainer.x && bounds.right > GAME_WIDTH) {
            this.direction = -1;
            this.aliensContainer.y += 10;
        }

        if (this.aliensContainer.x && bounds.left < 0) {
            this.direction = 1;
            this.aliensContainer.y += 10;
        }
    }
    public enemyBulletSystem() {
        this.enemyShootTimer++;

        // if (gameOver) {
        //     return;
        // }

        if (this.enemyShootTimer > this.enemyShootInterval) {
            // has enough time pass

            const shooters: Alien[] = []; // store the shooter enemies into an array

            for (let i = 0; i < this.aliens.length; i++) {
                // loop trough all the aliens and get alien on position i
                const alien = this.aliens[i];

                if (alien == null) continue; // if the picked alien is null (death) continue

                if (!this.hasEnemyBelow(i)) {
                    // if we have enemy below we do not push if there is no enemy we push
                    shooters.push(alien);
                }
            }
            if (shooters.length > 0) {
                // if we have at least one enemy allowed to shoot
                const randomShooter = shooters[Math.floor(Math.random() * shooters.length)];

                this.bullet.createEnemyBullet(this.aliensContainer, randomShooter);
                console.log("create bullet", this.bullet.createEnemyBullet(this.aliensContainer, randomShooter));
                
                this.enemyShootTimer = 0;
            }
        }
    }
     protected hasEnemyBelow(index: number) {
            // index === i
            for (let j = index + 11; j < this.aliens.length; j += 11) {
                if (this.aliens[j] !== null) {
                    return true; // we don't have death alien
                }
            }

            return false;
        }
        
}
