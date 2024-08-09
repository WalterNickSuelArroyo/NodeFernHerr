require('dotenv').config()
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
    const busquedas = new Busquedas();
    let opt = '';

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                // Buscar los lugares
                const lugares = await busquedas.ciudad(termino);

                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find(l => l.id === id)

                // Clima

                // Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:',lugarSel.nombre);
                console.log('Lat:', lugarSel.lng);
                console.log('Lng:', lugarSel.lat);
                console.log('Temperatura:',);
                console.log('Minima:',);
                console.log('Maxima:',);
                break;
            case 2:
                console.log('Opcion 2 seleccionada')
                break;
            default:
                break;
        }
        await pausa();
    } while (opt !== 0);
}

main();