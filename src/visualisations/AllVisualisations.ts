import Hearts from "./Hearts";
import Spiral from "./Spiral";
import Visualisation from "./Visualisation";

const allVisualisations = [Hearts, Spiral] as unknown as typeof Visualisation[];
export default allVisualisations;