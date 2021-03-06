const definitions = {
    // architecture de l'individu à 4 pattes avec les points (points) et les liens entre chaque points (edges)
    FourFeet: {
        points: [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
            [-1, 0],
            [-1, 1],
            [2, 0],
            [2, 1]
        ],
        edges: [
            [0, 1],
            [1, 2],
            [2, 3],
            [1, 4],
            [4, 5],
            [0, 5],
            [1, 5],
            [2, 7],
            [6, 7],
            [2, 6],
            [5, 7],
            [3, 7]
        ]
    },
    // architecture de l'individu à 8 pattes avec les points (points) et les liens entre chaque points (edges)
    EightFeet: {
        points: [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
            [-1, 0],
            [-1, 1],
            [2, 0],
            [2, 1],
            [3, 0],
            [3, 1],
            [4, 0],
            [4, 1],
            [5, 0],
            [5, 1],
            [6, 0],
            [6, 1]
        ],
        edges: [
            [0, 1],
            [1, 2],
            [2, 3],
            [1, 4],
            [4, 5],
            [0, 5],
            [1, 5],
            [2, 7],
            [6, 7],
            [2, 6],
            [5, 15],
            [3, 7],
            [7, 9],
            [8, 9],
            [9, 11],
            [8, 11],
            [9, 10],
            [10, 11],
            [12, 13],
            [14, 15],
            [13, 15],
            [13, 14],
            [12, 15],
            [11, 13]
        ]
    },
    // architecture de l'individu à 6 pattes avec les points (points) et les liens entre chaque points (edges)
    SixFeet:  {
        points: [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
            [-1, 0],
            [-1, 1],
            [2, 0],
            [2, 1],
            [3, 0],
            [3, 1],
            [4, 0],
            [4, 1],
        ],
        edges: [
            [0, 1],
            [1, 2],
            [2, 3],
            [1, 4],
            [4, 5],
            [0, 5],
            [1, 5],
            [2, 7],
            [6, 7],
            [2, 6],
            [5, 11],
            [3, 7],
            [7, 9],
            [8, 9],
            [9, 11],
            [8, 11],
            [9, 10],
            [10, 11]
        ]
    }
};
export default definitions;