class Fruit {
    constructor(seed) {
        this.seed = seed;
        this.index = seed.index
        this.value = seed.seed.value;
        this.image = fruitsImages[index-1];
        this.src = '../src/assets/fruits/fruit'+ parseInt(this.index) +'.png';
    }
}