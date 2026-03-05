import { Assets, Sprite } from "pixi.js";

 export function addSpaceShip(): Sprite {
    const texture = Assets.get('assets/spaceShip.png');

    const ship = new Sprite(texture);

    ship.anchor.set(0.5);
    ship.position.set(20, 700);
    ship.scale.set(0.1);


    return ship;
}

