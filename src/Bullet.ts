import { Container, Graphics, Sprite } from "pixi.js";

export class Bullet {
    graphics:  Graphics | null = null;
    constructor() {
        this.graphics = null;
    }

    public createBullet(ship: Sprite, world: Container) {
        if(this.graphics){ // ако графиките не са нул и имаме графикс върни 
            return
        }

        this.graphics = new Graphics(); // creating the bullet

        this.graphics.rect(-2, -10, 3, 10);
        this.graphics.fill({ color: 0xff0000 });

        this.graphics.position.set(ship.x, ship.y - 30);

        world.addChild(this.graphics); // add the bullet into the container(stage)
    }

    public moveBullet(world: Container) {
        if (this.graphics) {
            this.graphics.y -= 8;
            if (this.graphics.y < 0) {
                world.removeChild(this.graphics);
                this.graphics = null;
            }
        }
    }
}