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
    "These are dirt cheap and [enter generic fact here]",
    "The pearl seed is a famous trickster plant, because despite the name, pearl seeds are worthvery little. Howerer, they do have a pleasant aroma when crushed.",
    "The pear seed is misleadingly named, as the tree doesn't actually grow pears. Instead, the fruits of the pear tree are actually bitter, pear shaped pods which are used in many medicianal remedies.",
    "If you enjoy the taste of ginger, then a ginger tree will be an exellent addition to your garden! The fruits of the tree are the famous root (don't ask), so you get a year long supply if you look after your plant!",
    "When the coal tree and it's seeds were found, it brought the end of destructive coal mining, as every part of the tree burns like coal, and farming the species is much easier than mining",
    "Although abundant, pebble seeds can be quite hard to find, as they blend into their most common habitat, shingle beaches.The wood of the pebble tree becomes as hard as stone when left in seawater for five days.",
    "The blood seed is widely regarded as Mother Nature's most accursed creation, and folk tales tell of blood trees using their branches to skewer unwary travellers.",
    "Did you know that the potato seed can be eaten, and is rumored to have a plain, bland flavour?"
]

/**
 * @param index {int} - Range = (1, 8)
 */
class Seed {
    constructor(index) {
        this.index = index
        this.seed = SEEDS[index];
        this.src = '../src/assets/seeds/seed'+ parseInt(index) +'.png';
        this.description = SEEDS_DESCRIPTION[index-1];
        this.image = seedsImages[index-1];
        
        this.firstBranchPos = {x:0, y:0};
        this.radiusCrown = 0;
        this.middlePos = {x:0, y:0};
        this.maxFruits = 5;
        this.countFruits = 0;

        this.fruit = new Fruit(this);
    }
    
    dataTitle() {
        text = createP('seedData');
        text.parent('sketchHolder');
        text.id('seedDataTitle');
    }

    dataBody() {
        let infoLabel = createP('seedDataBody');
        infoLabel.parent('sketchHolder');
        infoLabel.id('seedDataBody');

        let message = 'you have found a ' + this.seed.name + ' seed!';
        infoLabel.html(message + `
            <img width="50px" src=${this.src}></img> <br/>
        <p id="seedDataFunFact">` + this.description + "</p>");
    }
    
    draw() {
        image(this.image, window.innerWidth / 2 - 100 - seedImgWidth / 2, window.innerHeight * seedHeightAlterer - seedImgHeight / 2 - 200 + bob, seedImgWidth, seedImgHeight);
    }

    loadPlantMaterial() {
        plantMaterialPath = '../src/assets/plantmaterials/stick'.concat(this.index, '.png');

        return loadImage(plantMaterialPath);
    }

    recalculatePos() {
        this.x = window.innerWidth / 2 - 90 - this.imgWidth / 2;
        this.y = potProperties.y + 190 - this.imgHeight / 2;
    }
}