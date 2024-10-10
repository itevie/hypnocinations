interface BaseVisualisationOption {
    type: "number" | "boolean";
    human: string;
}

interface NumberVisualisationOption extends BaseVisualisationOption {
    type: "number";
    rangeMin: number;
    rangeMax: number;
    default: number;
}

interface BooleanVisualisationOption extends BaseVisualisationOption {
    type: "boolean";
    default: boolean;
}

export type VisualisationOption = NumberVisualisationOption | BooleanVisualisationOption;

export type VisualisationOptions = { [key: string]: VisualisationOption };
export type Coordinate = { x: number, y: number };

export default class Visualisation {
    public name: string = "name";
    public description: string = "description";

    public fps: number = 60;

    protected interval: ReturnType<typeof setInterval> | undefined = undefined;

    public getOptions(): VisualisationOptions {
        throw new Error(`This visualiser does not implement getOptions`);
    }

    public draw(ctx: CanvasRenderingContext2D, options: any): void {
        throw new Error("This visualiser does not implement draw");
    }

    public stop(): void {
        clearInterval(this.interval);
    }
}