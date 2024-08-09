# 65. Inicio de seccion

# 66. Temas puntuales de la seccion

*Temas puntuales de la sección*

La sección se enfoca en los siguientes temas:

1. Consumo de APIs
2. Llamadas HTTP hacia servidores externos
3. Paquete request - superficialmente
4. Paquete Axios
5. Mapbox places para obtener lugares por nombre
6. Uso de OpenWeather para obtener el clima
7. Aplicación de consola con historial
8. Variables de entorno

# 67. Demostracion del objetivo final de la seccion

# 68. Inicio de proyecto - ClimaApp

```js
// Archivo inquirer.js
const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
]

const enter = [
    {
        type: 'input',
        name: 'press_enter',
        message: `Presione ${'ENTER'.green} para continuar`
    }

]

const inquirerMenu = async () => {
    console.clear();
    console.log('============================'.green);
    console.log('   Selecciones una opción'.white);
    console.log('============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () => {
    console.log('\n');
    await inquirer.prompt(enter);
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok
}

const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true: false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}
```

```js
// Archivo index.js
const { leerInput } = require("./helpers/inquirer")


const main = async () => {
    const texto = await leerInput('Hola: ');
    console.log(texto);
}

main();
```

# 69. Menu de la aplicacion

```js
// Archivo inquirer.js
const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar Ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            },
        ]
    }
]

const enter = [
    {
        type: 'input',
        name: 'press_enter',
        message: `Presione ${'ENTER'.green} para continuar`
    }

]

const inquirerMenu = async () => {
    console.clear();
    console.log('============================'.green);
    console.log('   Selecciones una opción'.white);
    console.log('============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () => {
    console.log('\n');
    await inquirer.prompt(enter);
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok
}

const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true: false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}
```

```js
// Archivo index.js
const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer")


const main = async () => {
    let opt = '';

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                console.log('Opcion 1 seleccionada')
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
```

# 70. Modelo para controlar la aplicacion

```js
//index.js
const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async () => {
    const busquedas = new Busquedas();
    let opt = '';

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                console.log(lugar);

                // Buscar los lugares

                // Seleccionar el lugar

                // Clima

                // Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:',);
                console.log('Lat:',);
                console.log('Lng:',);
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
```

```js
// busquedas.js
class Busquedas {
    historial = ['Tegucigalpa', 'Madrid', 'Bogota'];
    constructor() {
        //TODO: leer DB si existe
    }

    async ciudad(lugar = '') {
        //peticion http
        console.log(lugar);

        return [];
    }
}

module.exports = Busquedas;
```

# 71. Enlaces para la siguiente clase

# 72. Realizar peticiones HTTP desde Node

Recurso para prueba de solicitudes REST: https://reqres.in/

```js
//busquedas.js
const axios = require('axios');

class Busquedas {
    historial = ['Tegucigalpa', 'Madrid', 'Bogota'];
    constructor() {
        //TODO: leer DB si existe
    }

    async ciudad(lugar = '') {
        try {
            //peticion http
            //console.log('ciudad', lugar);
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data);

            return [];
        } catch (error) {
            return [];
        }

    }
}

module.exports = Busquedas;
```

```js
// index.js
const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async () => {
    const busquedas = new Busquedas();
    let opt = '';

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar);

                // Buscar los lugares

                // Seleccionar el lugar

                // Clima

                // Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:',);
                console.log('Lat:',);
                console.log('Lng:',);
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
```

# 73. Enlace para la proxima clase

Por favor abran y tengan a la mano los siguientes enlaces que necesitaremos:

https://www.mapbox.com/

https://docs.mapbox.com/api/search/geocoding/

# 74. Mapbox Search API y Token de acceso

Generar Tarjetas Gratis: https://herramientas-online.com/generador-tarjeta-credito-cvv.php

# 75. Crear instancias de Axios

```js
// busquedas.js
const axios = require('axios');

class Busquedas {
    historial = ['Tegucigalpa', 'Madrid', 'Bogota'];
    constructor() {
        //TODO: leer DB si existe
    }
    get paramsMapbox() {
        return {
            'access_token': '',
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad(lugar = '') {
        try {
            //peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/search/geocode/v6/forward?q=${lugar}`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            console.log(resp.data);

            return [];
        } catch (error) {
            return [];
        }

    }
}

module.exports = Busquedas;
```

# 76. Variables de entorno

```js
//busquedas.js
const axios = require('axios');

class Busquedas {
    historial = ['Tegucigalpa', 'Madrid', 'Bogota'];
    constructor() {
        //TODO: leer DB si existe
    }
    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad(lugar = '') {
        try {
            //peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/search/geocode/v6/forward?q=${lugar}`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            console.log(resp.data);

            return [];
        } catch (error) {
            return [];
        }

    }
}

module.exports = Busquedas;
```

# 77. Listar los paises de forma interactiva

```js
// index.js
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
```

```js
//inquirer.js
const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar Ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            },
        ]
    }
]

const enter = [
    {
        type: 'input',
        name: 'press_enter',
        message: `Presione ${'ENTER'.green} para continuar`
    }

]

const inquirerMenu = async () => {
    console.clear();
    console.log('============================'.green);
    console.log('   Selecciones una opción'.white);
    console.log('============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () => {
    console.log('\n');
    await inquirer.prompt(enter);
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listarLugares = async (lugares = []) => {
    const choices = lugares.map((lugar, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Selecciones lugar:',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok
}

const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true: false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}
```

```js
//busquedas.js
const axios = require('axios');

class Busquedas {
    historial = ['Tegucigalpa', 'Madrid', 'Bogota'];
    constructor() {
        //TODO: leer DB si existe
    }
    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad(lugar = '') {
        try {
            //peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/search/geocode/v6/forward?q=${lugar}`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.properties.full_address,
                lng: lugar.geometry.coordinates[0],
                lat: lugar.geometry.coordinates[1],
            }))
        } catch (error) {
            return [];
        }

    }
}

module.exports = Busquedas;
```

