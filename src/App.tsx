import React, { useRef, useState } from 'react';
import allVisualisations from './visualisations/AllVisualisations';
import Visualisation from './visualisations/Visualisation';
import VisualizerConfigerer from './Components/VisualizerConfigerer';

function App() {
  const [canvasShown, setCanvasShown] = useState<boolean>(false);
  const ref = useRef<HTMLCanvasElement>(null);

  function start(what: typeof Visualisation) {
    setCanvasShown(true);
    setTimeout(() => {
      const canvas = ref.current as HTMLCanvasElement;
      console.log(canvas);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      new what().draw(canvas.getContext("2d") as CanvasRenderingContext2D, { reverse: false, spinSpeed: 0.1, spawnSpeed: 200 });
    }, 1000);
  }

  return (
    <div>
    </div>
  );
}

export default App;
