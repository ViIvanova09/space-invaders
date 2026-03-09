import { Application, Graphics, Sprite } from "pixi.js";
// import { addSpaceShip } from "./space-ship";

const bullets: Graphics[] = [];

export function addBullets(ship: Sprite, app: Application) {
    const bullet = new Graphics();

    bullet.rect(-2, -10, 4, 12);
    bullet.fill({ color: 0xff0000 });
    bullet.position.set(ship.x, ship.y - ship.height); //480, 478.8

    bullets.push(bullet);

    app.stage.addChild(bullet);
}

export function shootingBullets() {
    bullets.forEach((bullet) => {
        bullet.y -= 8;
    });
    
}
