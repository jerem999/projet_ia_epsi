import css from '../css/styles.css';

import {simulate, setSimulationIterations, setCameraX, endSimulation} from './walkingEnvironment.js';

import {startSimulation} from './launchSimulation.js';

// lancement de la simulation avec le bouton start

startSimulation();

document.getElementById('start').addEventListener('click', () => {
    startSimulation();
});