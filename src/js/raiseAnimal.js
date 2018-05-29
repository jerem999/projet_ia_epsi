
import skeleton from './skeleton.js';

import {runArtificialIntelligence} from './artificalIntelligence.js';
import {simulate} from './walkingEnvironment.js';

export default function trainingAnimal(criteria) {



/* *************** Etape initial : definition des parametres necessaire au lancement de l'algorithme ********* */

    // variable necessaire à au lancement de l'algorithme
    const mutationRate = criteria.mutationRate;
    const creatureType = criteria.creatureType;
    const populationSize = criteria.populationSize;
    const crossoverRate = criteria.crossoverRate;


    // Le nombre de gene correspond au nombre de arrete de l'animal.
    const numberOfGenes = skeleton[creatureType].edges.length;

    
 /* *************** Etape 1 : La création de la population initiale   ********* */  

    //on genere  aleatoirement une population de pré-defini avec un patrimoine genetique aleatoire   
    function createPopulation() { 
        const population = [];
        // on parcourt la taille de la population et à chaque ind , on lui affecte un patrimoine genetique aleatoirement.
        // chaque numero du gene appartient à un muscle (un edge dans notre cas)
        for (let i = 0; i < populationSize; i++) {
            const geneticPatrimony = [];
            
            for (let j = 0; j < numberOfGenes; j++) {
                       
                geneticPatrimony.push(Math.random());
            }
            population.push(geneticPatrimony);
        }
        return population;
    }



/* *************** Etape 2 : évaluation des individus   ********* */  


    // la fonction permet d'evaluer les individu en fonction de la distance parcouru. ici on recupere sous forme de tableau les distances 
    // parcouru par chacun des membres de la population.
    async function fitness(animals) {

        //historique de marche des animaux. On recupere à la fois la distance max parcouru et la distance
        // à laquelle il etait à la fin de l'iteration
        const fitnessValue = await simulate(creatureType, animals)

        //On recupere les derniere distances ou s'est arreté des animaux à la fin de l'iteration
        return fitnessValue.map(result => 
            result.distance);

       
        
    }




    //sélection par tournoi 
    //Le principe de la sélection par tournoi augmente les chances pour les individus de piètre qualité de participer à l'amélioration de la population. 
    //Un tournoi consiste en une rencontre entre plusieurs individus pris au hasard dans la population. 
    //Le vainqueur du tournoi est l'individu de meilleure qualité.
    // Cette fonction compare deux fonctions fitnesse alatoirement. Si la fonction de fitness superieur à l'autre va faire 
    // que l'on va selectionner le parent
    function selectionOfParent(population, allFitnesses) {

        
        let parents = [];

        for (let i = 0; i < populationSize; i++) {

            let indexA = Math.floor(Math.random() * population.length);
            
            let indexB = Math.floor(Math.random() * population.length);

            

            let f1 = allFitnesses[indexA];
            let f2 = allFitnesses[indexB];

         

           
            if (f1 >= f2) {
                parents.push(population[indexA]);
            } else {
                parents.push(population[indexB]);
            }

        }

        return parents;

       
    }



/* *************** Etape 3 : création de nouveaux individus   ********* */  

    //Une autre solution que le croisement pour créer de nouveaux individus est de modifier ceux déjà existants. 
    //Une fois de plus, le hasard va nous être d'une grande utilité. 
    //Il peut s'avérer efficace de modifier aléatoirement quelques individus de notre population en en modifiant un gène ou un autre. 
    //Rien ne nous dit que l'individu muté sera meilleur ou moins bon, mais il apportera des possibilités supplémentaires qui pourraient bien être utiles pour la création de bonnes solutions. 
    //De même que pour les croisements, il n'est pas recommandé de faire muter tous les individus. 
    //Il est possible de faire muter un individu de la manière qu'il vous plaira. 
    //Une seule contrainte : l'individu muté doit être de la forme d'une solution potentielle.
    function mutation(individual) {

        if (Math.random() <= mutationRate) {
            const geneToMutate = Math.floor(Math.random() * individual.length);
            const value = Math.max(0, Math.min(1, individual[geneToMutate] + gauss()));

            individual[geneToMutate] = value;
        }
    }


    function gauss() {
        return (Math.random() + Math.random() + Math.random()
         + Math.random() + Math.random() + Math.random() - 3) / 3;
    }



    //On melange ADN de deux individux 
    //Les croisements permettent de simuler des reproductions d'individus dans le but d'en créer des nouveaux.
    // ici on fait des croisement aleatiore 
    function crossover(parent1, parent2) {
        //Premièrement, il faut savoir s'il faut mélanger ou non. 
        //Fait en générant un nombre aléatoire (entre 0 et 1) 
        //et en vérifiant s'il est inférieur à crossoverRate celui sélectionné.
        //on melange si le nombre aleatoire en inferieur au crossoverRate

        if (Math.random() < crossoverRate) {
            const crossoverPoint = Math.floor(Math.random() * parent1.length);

           
            
            for (let i = 0; i < crossoverPoint; i++) {
                const value = parent1[i];
                parent1[i] = parent2[i];
                parent2[i] = value;
            }
        }
    }


/* *************** Etape 4 :  L'insertion des nouveaux individus dans la population   ********* */  


    //Cette méthode de sélection permet de mettre en avant les meilleurs individus de la population.
    //Ce sont donc les individus les plus prometteurs qui vont participer à l'amélioration de notre population.
    // Cette méthode a l'avantage de permettre une convergence (plus) rapide des solutions, mais au détriment de la diversité des individus. 
    //On prend en effet le risque d'écarter des individus de piètre qualité, 
    //mais qui aurait pu apporter de quoi créer de très bonnes solutions dans les générations suivantes.
    // ici on classe la fonction de fitnesse par ordre decroissant et l'enfant est la sonnes des deux premier animaux ayant 
    // la meilleur fonction de fitnesse.
    function selectionOfAdult(oldPopulation, oldFitnesses, children) {

        const fitnessesSort = oldFitnesses.slice().sort((a, b) => a - b).reverse();

        const higherIndex = oldFitnesses.indexOf(fitnessesSort[0]);
        const secondHigherIndex = oldFitnesses.indexOf(fitnessesSort[1]);

        return children.concat([oldPopulation[secondHigherIndex], oldPopulation[higherIndex]]);
    }


   

    runArtificialIntelligence({
        createPopulation: createPopulation,
        fitness: fitness,
        adultSelection: selectionOfAdult,
        parentSelection: selectionOfParent,
        mutate: mutation,
        crossover: crossover
    });


 
}
