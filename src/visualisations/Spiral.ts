import { getCanvasCenter } from "./util";
import Visualisation, { VisualisationOptions } from "./Visualisation";

export default class Spiral extends Visualisation {
    public name = "Spiral";

    private angle: number = 0;
    private angleOffset: number = 0;
    private radius: number = 0;

    private angleIncrement: number = 0.01;
    private radiusIncrement: number = 0.1;

    public override getOptions(): VisualisationOptions {
        return {
            spinSpeed: {
                type: "number",
                human: "Spin Speed",
                rangeMin: 0.01,
                rangeMax: 0.6,
                default: 0.2,
            },
            reverse: {
                type: "boolean",
                human: "Reverse",
                default: false,
            }
        };
    }

    public override draw(ctx: CanvasRenderingContext2D, options: { spinSpeed: number, reverse: boolean }): void {
        ctx.canvas.style.backgroundColor = "#000";

        this.interval = setInterval(() => {
            this.radius = 0;
            this.angleOffset += options.reverse ? -options.spinSpeed : options.spinSpeed;
            this.angle = this.angleOffset;
            ctx.lineWidth = 1;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            this.drawFrame(ctx);
        }, 1000 / this.fps);
    }

    public drawFrame(ctx: CanvasRenderingContext2D): void {
        const { x: centerX, y: centerY } = getCanvasCenter(ctx);
        let [previousX, previousY] = [centerX, centerY];

        for (let i = 0; i < 20000; i++) {
            ctx.beginPath();
            const x = centerX + this.radius * Math.cos(this.angle);
            const y = centerY + this.radius * Math.sin(this.angle);

            ctx.lineWidth = Math.max(1, this.radius / 15);

            ctx.moveTo(previousX, previousY);
            ctx.lineTo(x, y);
            previousX = x; previousY = y;

            this.angle += this.angleIncrement;
            this.radius += this.radiusIncrement;

            ctx.strokeStyle = "#555";
            ctx.stroke();
        }
    }
}