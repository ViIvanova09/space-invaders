import { AnimatedSprite, Assets, Spritesheet, Texture } from "pixi.js";

export class SheetTexture extends AnimatedSprite {
    constructor() {
        const sheet = Assets.get("spritesheet") as Spritesheet; //type assertion 

        const frames = Object.values(sheet.textures) as Texture[];

        super(frames);

        this.anchor.set(0.5);
        this.loop = false;
        this.animationSpeed = 0.2;
        this.onComplete = () => this.destroy();
    }
}
