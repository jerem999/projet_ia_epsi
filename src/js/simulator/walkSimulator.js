import {World, Vec2, Edge} from 'planck-js';
import Creature from './creature.js';

const nrGrounds = 1;
const groundsDistance = 2.5;
const simulationTime = 15; // seconds
let finished = false;

const simFreq = 1 / 60;
let simulationIterations = 2;
let simulationTimeout = null;
let renderInterval = null;

let simulation = null;
let promiseResolve = null;


const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

export function simulate(creatureType, phenotypes) {
    finished = false;
    simulation = new Simulation(creatureType, phenotypes);

   

    startSimulation();
    startRendering();

    return new Promise(resolve => promiseResolve = resolve);
}

export function setSimulationIterations(nr) {
    simulationIterations = nr;
}

export function setCameraX(x) {
    simulation.camera.pos.x = x;
}

function startSimulation() {
    for (let i = 0; i < simulationIterations; i++) {
        simulation.update();
    }

    if (simulation.isFinished()) {
        finishSimulation();
    } else {
        let timeout = 1000 * simFreq;
        if (simulationIterations > 15) {
            timeout = 1; // to not have 1/60 timeout when trying to speed up very fast
        }

        simulationTimeout = setTimeout(startSimulation, timeout);
    }
}

function startRendering() {
    renderInterval = setInterval(() => {
        simulation.render();
    }, 1000 * simFreq);
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
        simulation.timeout = simulationTime + 1;
    }

}


class Simulation {

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

            const offsett = (i % nrGrounds) * groundsDistance;

            //console.log("je suis le offset");
            //console.log(offsett);
            
            

            
            return new Creature(creatureType, p, this.world, getRandomColor(), offsett);
            
            
            
        });

   
        this.timePassed = 0;

    }


    update() {
        this.timePassed += simFreq;

        if (this.isFinished()) {
            return;
        }

        this.creatures.forEach(c => c.update(this.timePassed));
        this.world.step(simFreq);
    }

    isFinished() {
        return this.timePassed >= simulationTime;
    }

    render() {
        const camera = this.camera;
        console.log(canvas.height / 20 + (camera.pos.y * camera.zoom))
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(this.timePassed.toFixed(1), 100, 10);

        ctx.save();

        ctx.translate(canvas.width / 2 - (camera.pos.x * camera.zoom),
            canvas.height / 10 + (camera.pos.y * camera.zoom));
        ctx.scale(camera.zoom, -camera.zoom);

        this.renderGrounds();
        this.renderMaxLine();

        this.creatures.forEach(c => c.render(ctx));


        ctx.restore();
    }

    renderGrounds() {
        for (let i = 0; i < nrGrounds; i++) {
            ctx.beginPath();
            ctx.lineWidth = .01;

            ctx.moveTo(-40, i * groundsDistance);
            ctx.lineTo(100, i * groundsDistance);
            ctx.stroke();
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

        ctx.beginPath();
        ctx.lineWidth = .005;
        ctx.moveTo(0, -5);
        ctx.lineTo(0, 17);
        ctx.stroke();

        ctx.save();
        ctx.font = '0.3px serif';
        ctx.scale(1, -1);
        ctx.fillText(max.toFixed(2), max+0.1, 1);
        ctx.fillText(currMax.toFixed(2), currMax-.8, 1);

        ctx.restore();

        ctx.beginPath();
        ctx.lineWidth = .01;
        ctx.moveTo(max, -5);
        ctx.lineTo(max, 17);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = .005;
        ctx.moveTo(currMax, -5);
        ctx.lineTo(currMax, 17);
        ctx.stroke();
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