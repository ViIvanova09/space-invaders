import { Assets, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants";

const commands = {
    arrowLeft: false,
    arrowRight: false,
};

export function addSpaceShip(): Sprite {
    const texture = Assets.get("assets/spaceShip.png");

    const ship = new Sprite(texture);

    ship.anchor.set(0.5, 1);
    ship.position.set(GAME_WIDTH / 2, GAME_HEIGHT - 10); //x=480, y=530
    ship.scale.set(0.1);

    return ship;
}
export function keyDownMovement(key: string) {
    if (key === "ArrowLeft") {
        commands.arrowLeft = true;
    }

    if (key === "ArrowRight") {
        commands.arrowRight = true;
    }
}

export function keyUpMovement(ship: Sprite, key: string) {
    if (key === "ArrowLeft") {
        commands.arrowLeft = false;
    }

    if (key === "ArrowRight") {
        commands.arrowRight = false;
    }
}

export function addMovement(ship: Sprite) {
    const speed = 5;

    if (commands.arrowLeft) {
        ship.x -= speed;
    }

    if (commands.arrowRight) {
        ship.x += speed;
    }

    setBounaries(ship);
}

export function setBounaries(ship: Sprite) {
    // clamping setting boundaries
    const halfWidth = ship.width / 2;

    ship.x = Math.max(halfWidth, Math.min(GAME_WIDTH - halfWidth, ship.x));
}
