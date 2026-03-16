import { Container, Graphics, Sprite } from "pixi.js";

const bullets: Graphics[] = [];


export function addBullets(ship: Sprite, world: Container ) {
    const bullet = new Graphics();


    bullet.rect(-2 , -10, 2, 10);
    bullet.fill({ color: 0xff0000 });

    bullet.position.set(ship.x, ship.y - 30); 
   

    bullets.push(bullet);

    world.addChild(bullet);

}

export function shootingBullets(world: Container){
    for(let i = bullets.length - 1; i >= 0; i--){
        const bullet = bullets[i];

         bullet.y -= 8; 
         if(bullet.y < 0){
            world.removeChild(bullet);
            bullet.destroy();
            bullets.splice(i, 1);
         }
    }
}
// [0, 1, 2, 4]


