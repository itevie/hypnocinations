import { Coordinate } from "./Visualisation";

export function getCanvasCenter(ctx: CanvasRenderingContext2D): Coordinate {
    return {
        x: ctx.canvas.width / 2,
        y: ctx.canvas.height / 2
    }
}