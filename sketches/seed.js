const SEEDS = {
    1: {name: "generic", value: 1},
    2: {name: "pearl", value: 5},
    3: {name: "pear", value: 3},
    4: {name: "ginger", value: 2},
    5: {name: "coal", value: 4},
    6: {name: "pebble", value: 1},
    7: {name: "blood", value: 10},
    8: {name: "potato", value: 3}
}

const SEEDS_DESCRIPTION = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8"
]

/**
 * @param index {int} - Range = (1, 8)
 */
class Seed {
    constructor(index) {
        this.seed = SEEDS[index];
        this.src = '../src/assets/seeds/seed'+ index +'.png';
        this.description = SEEDS_DESCRIPTION[index-1];
        this.image = seedsImages[index-1];
    }
}