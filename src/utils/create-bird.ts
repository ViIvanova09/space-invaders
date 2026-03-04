import { AnimatedSprite, Texture } from "pixi.js";

export function createBird(): AnimatedSprite {
    const bird = new AnimatedSprite([
        Texture.from("birdUp.png"),
        Texture.from("birdMiddle.png"),
        Texture.from("birdDown.png"),
    ]);

    bird.loop = true;
    bird.animationSpeed = 0.1;
    bird.play();
    bird.scale.set(3);
    bird.anchor.set(0.5, 0.5);
    bird.position.set(20, 400);
    

    return bird;
}
