import allVisualisations from "../visualisations/AllVisualisations";

export default function VisualizationList() {
    function goTo(id: number) {
        window.location.href = `/${id}`;
    }

    return (
        <>
            {allVisualisations.map((v, i) => <>
                <button onClick={() => goTo(i)}>{new v().name}</button><br />
            </>)}
        </>
    )
}