import { Container, Graphics, Sprite } from "pixi.js";

export class Bullet {
    shipBullet:  Graphics | null = null;
    alienBullets: Graphics[] = [];
    constructor() {
        this.shipBullet = null;
    }

    public createBullet(ship: Sprite, world: Container) {
        if(this.shipBullet){ // ако графиките не са нул и имаме графикс върни 
            return
        }

        this.shipBullet = new Graphics(); // creating the bullet

        this.shipBullet.rect(-2, -10, 3, 10);
        this.shipBullet.fill({ color: 0xff0000 });

        this.shipBullet.position.set(ship.x, ship.y - 30);
        

        world.addChild(this.shipBullet); // add the bullet into the container(stage)
    }
    public createEnemyBullet(world: Container, alien: Sprite){
        const alienBullet = new Graphics();

        alienBullet.rect(-2, -20, 3, 10);
        alienBullet.fill({color: 16777215 }) // color white
        alienBullet.position.set(alien.x, alien.y - 30);
        this.alienBullets.push(alienBullet);

        world.addChild(alienBullet)
    }
    public moveBullet(world: Container) {
        if (this.shipBullet) {
            this.shipBullet.y -= 8;
            if (this.shipBullet.y < 0) {
                world.removeChild(this.shipBullet);
                this.shipBullet = null;
            }
        }
    }
}