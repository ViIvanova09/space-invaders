import { Assets, Sprite } from "pixi.js";

 export async function addSpaceShip(): Promise <Sprite> {
    const texture = await Assets.load('assets/spaceShip.png');
    const ship = new Sprite(texture);

    ship.anchor.set(0.5);
    ship.position.set(20, 700);
    ship.scale.set(0.1);


    return ship;
}

