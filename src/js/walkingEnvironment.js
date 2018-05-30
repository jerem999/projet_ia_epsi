import {World, Vec2, Edge} from 'planck-js';
import animal from './animal';

const soil = 1;
const soilDistance = 2.5;

//temps d'extension de l'iteration
const chrono = 15; // seconds
let terminated = false;

const simulationFrequence = 1 / 60;
let simulationIterations = 2;
let simulationTimeout = null;
let renderInterval = null;

let simulation = null;
let promiseResolve = null;


const canvas = document.getElementById('homePageCanvas');
const context = canvas.getContext('2d');

export function simulate(creatureType, geneticPatrimony) {


    terminated = false;
    simulation = new generateEnvironement(creatureType, geneticPatrimony);


    launchSimulation();
    launchRendering();

    return new Promise(resolve => promiseResolve = resolve);
}

export function setSimulationIterations(nr) {
    simulationIterations = nr;
}

export function setCameraX(x) {
    simulation.camera.pos.x = x;
}

function launchSimulation() {
    for (let i = 0; i < simulationIterations; i++) {
        simulation.update();
    }

    if (simulation.isFinished()) {
        finishSimulation();
    } else {
        let timeout = 1000 * simulationFrequence;
        if (simulationIterations > 15) {    // réinitialisation du timer toutes les 15 secondes
            timeout = 1;
        }

        simulationTimeout = setTimeout(launchSimulation, timeout);
    }
}

function launchRendering() {
    renderInterval = setInterval(() => {
        simulation.render();
    }, 1000 * simulationFrequence);
}

function finishSimulation() {
    
    endSimulation();

    const result = simulation.creatures.map(c => {
        return {
            maxDst: c.maxDst,
            distance: c.findDst()
        }
    });

    promiseResolve(result);
}
export function endSimulation() {
    clearTimeout(simulationTimeout);
    clearInterval(renderInterval);


    
    if (simulation) {
        simulation.timeout = chrono + 1;
    }

}


class generateEnvironement {

    constructor(creatureType, phenotypes) {
        // position des creatures au depart de la simulation
        this.camera = {
            pos: Vec2(7, 5.5),
            zoom: 45,
        };
        
        // creation du monde avec prise en compte de la gravite terrestre
        this.world = new World(Vec2(0, -10));
        this.createGround();


        

        this.creatures = phenotypes.map((p, i) => {

            const offsett = (i % soil) * soilDistance;

            return new animal(creatureType, p, this.world, getRandomColor(), offsett);
            
            
            
        });

   
        this.timePassed = 0;

    }

    update() {
        this.timePassed += simulationFrequence;

        if (this.isFinished()) {
            return;
        }

        this.creatures.forEach(c => c.update(this.timePassed));
        this.world.step(simulationFrequence);
    }

    isFinished() {
        return this.timePassed >= chrono;
    }

    render() {
        const camera = this.camera;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillText(this.timePassed.toFixed(1), 100, 10);

        context.save();

        context.translate(canvas.width / 2 - (camera.pos.x * camera.zoom),
            canvas.height / 10 + (camera.pos.y * camera.zoom));
        context.scale(camera.zoom, -camera.zoom);

        this.renderGrounds();
        this.renderMaxLine();

        this.creatures.forEach(c => c.render(context));


        context.restore();
    }

    renderGrounds() {
        for (let i = 0; i < soil; i++) {
            context.beginPath();
            context.lineWidth = .01;

            context.moveTo(-40, i * soilDistance);
            context.lineTo(100, i * soilDistance);
            context.stroke();
        }
    }

    renderMaxLine() {
        var max = 0;
        var currMax = 0;
        this.creatures.forEach(c => {
            const x = c.maxDst;
            const currX = c.findDst();
            if (x > max) {
                max = x;
            }

            if (currX > currMax) {
                currMax = currX;
            }
        });

        if (max > this.camera.pos.x + 3) {
            this.camera.pos.x = max - 3;
        }

        context.beginPath();
        context.lineWidth = .005;
        context.moveTo(0, -5);
        context.lineTo(0, 17);
        context.stroke();

        context.save();
        context.font = '0.3px serif';
        context.scale(1, -1);
        context.fillText(max.toFixed(2), max+0.1, 1);
        context.fillText(currMax.toFixed(2), currMax-.8, 1);

        context.restore();

        context.beginPath();
        context.lineWidth = .01;
        context.moveTo(max, -5);
        context.lineTo(max, 17);
        context.stroke();

        context.beginPath();
        context.lineWidth = .005;
        context.moveTo(currMax, -5);
        context.lineTo(currMax, 17);
        context.stroke();
    }

    createGround() {

        this.ground = this.world.createBody();
        this.ground.createFixture(Edge(Vec2(-400.0, 0), Vec2(100.0, 0)),
            {density: 0, friction: 1.5});
 

    }

}

// couleur des points des creatures 
function getRandomColor() {
    return {
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255),
    }
}