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
export function keyDownMovment(key: string) {
    if (key === "ArrowLeft") {
        keys.arrowLeft = true;
    }

    if (key === "ArrowRight") {
        keys.arrowRight = true;
    }
}
export function keyUpMovment(key: string) {
    if (key === "ArrowLeft") {
        keys.arrowLeft = false;
    }

    if (key === "ArrowRight") {
        keys.arrowRight = false;
    }
}
window.addEventListener("keydown", (e) => {
    keyDownMovment(e.key);
});

window.addEventListener("keyup", (e) => {
    keyUpMovment(e.key);
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
    const halfWidth = ship.width / 2;

    if (ship.x < halfWidth) {
        ship.x = halfWidth;
    }

    if (ship.x > GAME_WIDTH - halfWidth) {
        ship.x = GAME_WIDTH - halfWidth;
    }
}

// app.stage.eventMode = "static";
// let mouseX = 0;

// app.stage.on("globalpointermove", (e) => {
//     // check the pixi documentation
//     mouseX = e.global.x;
// });

// export function addMouseMovement(ship: Sprite) {
//     const mouseX = GAME_WIDTH / 2;
//     const ease = 0.5;

//     ship.x += (mouseX - ship.x) * ease;

// }
