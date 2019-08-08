const FRUIT_SIZE = 60;

class Fruit {
    constructor(seed) {
        this.seed = seed;
        this.index = seed.index;
        this.value = seed.seed.value;
        this.image = fruitsImages[this.index-1];
        this.src = '../src/assets/fruits/fruit'+ this.index +'.png';

        this.position = {
            x: 800,
            y: 800,
        }
    }

    draw() {
        image(this.image, this.position.x, this.position.y, FRUIT_SIZE, FRUIT_SIZE);
    }
}