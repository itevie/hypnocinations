import { getCanvasCenter } from "./util";
import Visualisation, { Coordinate, VisualisationOptions } from "./Visualisation";

interface Heart {
    location: Coordinate,
    size: number,
    opacity: number,
}

export default class Hearts extends Visualisation {
    public name = "Hearts";

    private hearts: (Heart | null)[] = [];
    private spawnHeartInterval: ReturnType<typeof setInterval> | undefined = undefined;
    private renderFrameInterval: ReturnType<typeof setInterval> | undefined = undefined;

    public getOptions(): VisualisationOptions {
        return {
            reverse: {
                type: "boolean",
                human: "Reverse",
                default: false,
            },
            spawnSpeed: {
                type: "number",
                human: "Rate (ms)",
                rangeMin: 100,
                rangeMax: 2000,
                default: 250,
            }
        }
    }

    private addHeart(ctx: CanvasRenderingContext2D, reverse: boolean): void {
        const { x, y } = getCanvasCenter(ctx);
        this.hearts.push({
            location: { x, y: reverse ? y - 10 * (1 / 0.01) : y },
            size: reverse ? 20 * (1 / 0.01) : 50,
            opacity: reverse ? 0 : 1,
        });
    }

    public draw(ctx: CanvasRenderingContext2D, options: { reverse: boolean, spawnSpeed: number }): void {
        this.addHeart(ctx, options.reverse);

        this.spawnHeartInterval = setInterval(() => {
            this.addHeart(ctx, options.reverse);
        }, options.spawnSpeed);

        this.renderFrameInterval = setInterval(() => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            for (const heart of this.hearts as Heart[]) {

                drawHeart(ctx, heart.location.x, heart.location.y, heart.size, heart.size, `rgba(255, 0, 255, ${heart.opacity})`);

                if (options.reverse) {
                    heart.size -= 20;
                    heart.location.y += 10;
                    heart.opacity += 0.01;
                } else {
                    heart.size += 20;
                    heart.location.y -= 10;
                    heart.opacity -= 0.01;
                }

                if (options.reverse && heart.opacity > 1)
                    this.hearts[this.hearts.indexOf(heart)] = null;
                if (!options.reverse && heart.opacity < 0)
                    this.hearts[this.hearts.indexOf(heart)] = null;
            }
            this.hearts = this.hearts.filter(x => x);
        }, 1000 / 60);
    }

    public override stop(): void {
        clearInterval(this.renderFrameInterval);
        clearInterval(this.spawnHeartInterval);
    }
}

/**
 * 
 * @copyright https://stackoverflow.com/a/58333880
 */
function drawHeart(
    ctx: CanvasRenderingContext2D,
    fromx: number,
    fromy: number,
    lw: number,
    hlen: number,
    color: string
) {
    let x = fromx;
    let y = fromy;
    let width = lw;
    let height = hlen;

    ctx.save();
    ctx.beginPath();
    let topCurveHeight = height * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(
        x, y,
        x - width / 2, y,
        x - width / 2, y + topCurveHeight
    );

    // bottom left curve
    ctx.bezierCurveTo(
        x - width / 2, y + (height + topCurveHeight) / 2,
        x, y + (height + topCurveHeight) / 2,
        x, y + height
    );

    // bottom right curve
    ctx.bezierCurveTo(
        x, y + (height + topCurveHeight) / 2,
        x + width / 2, y + (height + topCurveHeight) / 2,
        x + width / 2, y + topCurveHeight
    );

    // top right curve
    ctx.bezierCurveTo(
        x + width / 2, y,
        x, y,
        x, y + topCurveHeight
    );

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}