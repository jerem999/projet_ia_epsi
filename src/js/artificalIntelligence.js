let currentGeneration = 1;

    // permet l'affichage de la génération en cours et le max atteint
    // sur le dashboard sous la simualtion

export function runArtificialIntelligence({createPopulation, fitness, adultSelection, parentSelection, crossover, mutate}) {

    currentGeneration = 1;
    
    debugInfo([0]);
    let population = createPopulation();

    async function iteration() {

        while(true) {
            const fitnesses = await fitness(population);

            debugInfo(fitnesses);

            const parents = parentSelection(population, fitnesses);

            const children = [];

            for (let i = 0; i < parents.length; i += 2) {
                const parent1 = parents[i];
                const parent2 = parents[(i + 1) % parents.length];

                const child1 = copy(parent1);
                const child2 = copy(parent2);

                crossover(child1, child2);
                children.push(child1);
                children.push(child2);
            }

            children.forEach(c => mutate(c));

            population = adultSelection(population, fitnesses, children);
            currentGeneration++;
        }
    }

    iteration();


}

function copy(individual) {
    return individual.slice();
}

function debugInfo(fitnesses) {
    let max = -99999;
    fitnesses.forEach(f => {
        if (f > max) {
            max = f;
        }
    });

    document.getElementById("debugInfo").innerHTML = `<b>Generation: <b/>${currentGeneration}, <b>Best fitness: </b>${max.toFixed((2))}`;
}