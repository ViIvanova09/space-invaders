import { Container, Graphics, Sprite } from "pixi.js";
import { GAME_HEIGHT } from "./Constants";
import { Alien } from "./Alien";

export class Bullet {
    shipBullet:  Graphics | null = null;
    alienBullets: Graphics[] = [];

    constructor() {
        this.shipBullet = null;

    }

    public createPlayerBullet(ship: Sprite, world: Container) {
        if(this.shipBullet){ 
            return
        }

        this.shipBullet = new Graphics(); // creating the bullet

        this.shipBullet.rect(-2, -10, 3, 10);
        this.shipBullet.fill({ color: 0xff0000 });

        this.shipBullet.position.set(ship.x, ship.y - 30);
        

        world.addChild(this.shipBullet); // add the bullet into the container(stage)
    }
    public createEnemyBullet(alienContainer: Container, alien: Alien){
        const alienBullet = new Graphics();
        
        alienBullet.rect(-2, -20, 3, 10);
        alienBullet.fill({color: 16777215 }) // color white
        
        alienBullet.position.set(alien.x, alien.y + 20)
        this.alienBullets.push(alienBullet);
        alienContainer.addChild(alienBullet);
       
    }
    public moveShipBullet(world: Container) {
        if (this.shipBullet) {
            this.shipBullet.y -= 8;
            if (this.shipBullet.y < 0) {
                world.removeChild(this.shipBullet);
                this.shipBullet = null;
            }
        }
    }
    public moveEnemyBullet(world: Container){
    for (let i = this.alienBullets.length - 1; i >= 0; i--) {
        const alienBullet = this.alienBullets[i];
        
        
        alienBullet.y += 6;
        
        if (alienBullet.y > GAME_HEIGHT) {
                world.removeChild(alienBullet);
                
                this.alienBullets.splice(i, 1)
                alienBullet.destroy()
            }
        }
    }  
}