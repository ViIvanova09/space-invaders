import { Assets, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants";

const keys = {
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
window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        keys.arrowLeft = true;
    }

    if (e.code === "ArrowRight") {
        keys.arrowRight = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") {
        keys.arrowLeft = false;
    }

    if (e.code === "ArrowRight") {
        keys.arrowRight = false;
    }
});

export function addMovement(ship: Sprite) {
    const speed = 5;

    if (keys.arrowLeft) {
        ship.x -= speed;
    }

    if (keys.arrowRight) {
        ship.x += speed;
    }

    ship.x = Math.max(30, Math.min(GAME_WIDTH - 30, ship.x)); // clamping setting boundaries
}

export function addMouseMovement(ship: Sprite, mouseX: number) {
    ship.x = mouseX;
    // ship.x += (mouseX - ship.x) * 0.2;
    // ship.x = mouseX + 5;
    const halfWidth = ship.width / 2;

    if (ship.x < halfWidth) {
        ship.x = halfWidth;
    }

    if (ship.x > GAME_WIDTH - halfWidth) {
        ship.x = GAME_WIDTH - halfWidth;
    }
}
