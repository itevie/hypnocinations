import { useEffect, useMemo, useRef, useState } from "react";
import Visualisation, { VisualisationOption, VisualisationOptions } from "../visualisations/Visualisation";
import Frame from "./Frame";
import allVisualisations from "../visualisations/AllVisualisations";
import Box from "./Box";

export default function VisualizerConfigerer() {
    const [instance, setInstance] = useState<Visualisation | undefined>(undefined);
    const [options, setOptions] = useState<{ [key: string]: any }>({});
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const player = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Get the visualisation ID
        const id = window.location.pathname.match(/[0-9]+/);
        if (!id) return;

        const type = allVisualisations[parseInt(id[0])];
        setInstance(new type());
    }, []);

    function play() {
        setIsPlaying(true);
        setTimeout(() => {
            // Get canvas
            const canvas = player.current;
            if (!canvas) return;

            // Update
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Get the ID
            const id = window.location.pathname.match(/[0-9]+/);
            if (!id) return;

            // Get default options
            const defaults: { [key: string]: any } = {};
            for (const [k, v] of Object.entries((instance as Visualisation).getOptions())) {
                defaults[k] = v.default;
            }

            // Create instance
            const type = allVisualisations[parseInt(id[0])];
            const visual = new type();
            visual.draw(canvas.getContext("2d") as CanvasRenderingContext2D, { ...defaults, ...options });

            canvas.onclick = () => {
                visual.stop();
                setIsPlaying(false);
            }
        }, 100);
    }

    function setOption(key: string, type: VisualisationOption["type"], event: React.ChangeEvent<HTMLInputElement>) {
        const temp = { ...options };
        switch (type) {
            case "boolean":
                temp[key] = event.target.checked;
                break;
            case "number":
                temp[key] = parseFloat(event.target.value);
                break;
        }
        setOptions(temp);
    }

    return (
        <>
            {
                isPlaying
                    ? <canvas ref={player} />
                    : <>
                        {
                            !instance
                                ? <label>Loading...</label>
                                :
                                <Frame>
                                    <div className="side-by-side">
                                        <div>
                                            <h1>{instance.name}</h1>
                                            <p>{instance.description}</p>
                                            <table>
                                                {Object.entries(instance.getOptions()).map(([k, v]) => <tr>
                                                    <td style={{ maxWidth: "200px", float: "right" }}><b>{v.human}</b></td>
                                                    <td>
                                                        {
                                                            {
                                                                "number": <>
                                                                    <input
                                                                        min={(v as any).rangeMin}
                                                                        max={(v as any).rangeMax}
                                                                        value={options[k] as number ?? v.default as number}
                                                                        onChange={(i) => setOption(k, v.type, i)}
                                                                        step={(v as any).rangeMin}
                                                                        type="range" />
                                                                    <label>({options[k] as number ?? v.default as number})</label>
                                                                </>,
                                                                "boolean": <input
                                                                    checked={options[k] as boolean ?? v.default}
                                                                    onChange={(i) => setOption(k, v.type, i)}
                                                                    type="checkbox" />
                                                            }[v.type]
                                                        }
                                                    </td>
                                                </tr>)}
                                            </table>
                                        </div>
                                        <div>
                                            <button onClick={play}>Start</button>
                                        </div>
                                    </div>
                                </Frame >
                        }
                    </>
            }
        </>
    );
}