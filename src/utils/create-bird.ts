import { AnimatedSprite, Texture } from "pixi.js";
import {GAME_HEIGHT, GAME_WIDTH} from "./constants"

export function createBird(): AnimatedSprite {
    const bird = new AnimatedSprite([
        Texture.from("birdUp.png"),
        Texture.from("birdMiddle.png"),
        Texture.from("birdDown.png"),
    ]);

    bird.loop = true;
    bird.animationSpeed = 0.1;
    bird.play();
    bird.scale.set(2);
    bird.anchor.set(0.5, 1);
    bird.position.set(GAME_WIDTH / 2, GAME_HEIGHT - 150);
    

    return bird;
}
