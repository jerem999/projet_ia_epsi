import css from '../css/styles.css';
//import {simulate, setSimulationIterations, setCameraX, endSimulation} from './simulator/walkSimulator.js';
import {simulate, setSimulationIterations, setCameraX, endSimulation} from './walkingEnvironment.js';
//import evolveWalkers from './walkerEaRunner.js';
import {startSimulation} from './launchSimulation.js';


// function startSimulation() {
//     //endSimulation();
//     const options = {
//         // mutationRate: parseFloat(document.getElementById('mutationslider').value),
//         // crossoverRate: parseFloat(document.getElementById('crossoverslider').value),
//         // creatureType: document.getElementById('figure').value,
//         // populationSize: document.getElementById('populationslider').value

//         mutationRate: 0.6,
//         crossoverRate: 0.5,
//         creatureType: document.getElementById('figure').value,
//         populationSize: 2
//     };


    

    // evolveWalkers(options);

// }

//startSimulation();


startSimulation();









document.getElementById('speedslider').addEventListener('input', () => {
    let value = document.getElementById('speedslider').value;
    setSimulationIterations(value);
    document.getElementById('speedslidervalue').value = value;
});
/*document.getElementById('cameraslider').addEventListener('input', () => {
    let value = document.getElementById('cameraslider').value;
    setCameraX(value);
    document.getElementById('cameraslidervalue').value = value;
});*/
document.getElementById('mutationslider').addEventListener('input', () => {
    let value = document.getElementById('mutationslider').value;
    document.getElementById('mutationslidervalue').value = value;
});
document.getElementById('crossoverslider').addEventListener('input', () => {
    let value = document.getElementById('crossoverslider').value;
    document.getElementById('crossoverslidervalue').value = value;
});
document.getElementById('populationslider').addEventListener('input', () => {
    let value = document.getElementById('populationslider').value;
    document.getElementById('populationslidervalue').value = value;
});

document.getElementById('start').addEventListener('click', () => {
    startSimulation();
});