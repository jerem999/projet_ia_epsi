import trainingAnimal from './raiseAnimal';



export function startSimulation() {
    const criteria = {

        mutationRate: 0.6,  // taux de mutation => 60%
        crossoverRate: 0.5, // taux de croisement => 50%
        creatureType: document.getElementById('figure').value, // choix 4, 6 ou 8 pattes
        populationSize: 20 // nombre d'individu
    };


    

    trainingAnimal(criteria);

}