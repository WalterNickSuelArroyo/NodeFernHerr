const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneracion',
    getNombre() {
        return `${this.nombre} ${this.apellido} ${this.poder}`;
    }
}
console.log(deadpool.getNombre());

//PRIMERA FORMA
const nombre1 = deadpool.nombre;
const apellido1 = deadpool.apellido;
const poder1 = deadpool.poder;

console.log(nombre1, apellido1, poder1);

//SEGUNDA FORMA-FORMA DESESTRUCTURADA
const {nombre,apellido,poder} = deadpool;
console.log(nombre, apellido, poder);

//TAMBIEN SE PUEDE HACER LO SIGUIENTE
/*
const {nombre, apellido, poder, edad=0} = deadpool;
console.log(nombre, apellido, poder, edad);
*/
//La salida en edad seria undefined, pero como se le puso edad=0 la salida es 0

function imprimeHeroe(heroe) {
    const {nombre, apellido, poder, edad = 0} = heroe;
    console.log(nombre, apellido, poder, edad);
}
imprimeHeroe(deadpool);

//OTRA FORMA DE DESESTRUCTURAR ESA FUNCION ES EN LOS ARGUMENTOS
function imprimeHeroe2({nombre, apellido, poder, edad = 5}) {
    console.log(nombre, apellido, poder, edad);
}
imprimeHeroe2(deadpool);

const heroes = ['Deadpool', 'Superman', 'Batman'];
const h1 = heroes[0];
const h2 = heroes[1];
const h3 = heroes[2];

console.log(h1, h2, h3);

// DESESCTRUCTURANDO UN ARREGLO
const [h11, h22, h33] = heroes;
console.log(h11, h22, h33);
//La salida es Deadpool Superman Batman

//CUANDO SOLO QUIERO UN ELEMENTO DESESTRUCTURAR
const [, , h333] = heroes;
console.log(h333);
//La salida es Batman