import trainingAnimal from './raiseAnimal';



export function startSimulation() {
    //endSimulation();
    const criteria = {
        // mutationRate: parseFloat(document.getElementById('mutationslider').value),
        // crossoverRate: parseFloat(document.getElementById('crossoverslider').value),
        // creatureType: document.getElementById('figure').value,
        // populationSize: document.getElementById('populationslider').value

        mutationRate: 0.6,
        crossoverRate: 0.5,
        creatureType: document.getElementById('figure').value,
        populationSize: 2
    };


    

    trainingAnimal(criteria);

}