import css from '../css/styles.css';

import {simulate, setSimulationIterations, setCameraX, endSimulation} from './walkingEnvironment.js';

import {startSimulation} from './launchSimulation.js';


startSimulation();









document.getElementById('speedslider').addEventListener('input', () => {
    let value = document.getElementById('speedslider').value;
    setSimulationIterations(value);
    document.getElementById('speedslidervalue').value = value;
});


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