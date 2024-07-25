# 43. Introduccion a la seccion

# 44. Temas puntuales de la seccion

![](img/4.PNG)

# 45. Demostracion del objetivo final de la seccion

# 46. Inicio del proyecto - Tareas por hacer

Para crear el package rapido usamos: npm init -y

```js
require('colors');
console.clear();
const main = async() => {
    
    console.log('Hola Mundo');
}

main();
```

# 47. stdin - stdout - Readline
# 48. Repetir el menu de forma infinita

```js
// Archivo App.js

require('colors');
const { mostrarMenu, pausa } = require('./helpers/mensajes');
console.clear();

const main = async() => {
    console.log('Hola Mundo');
    let opt = '';
    do {
        opt = await mostrarMenu();
        console.log({opt});
        if (opt !== '0') await pausa();
    } while (opt !== '0');
    //pausa();
}

main();
```

```js
// Archivo helper/mensajes.js
const { resolve } = require('path');

require('colors');

const mostrarMenu = () => {
    return new Promise(resolve => {
        console.clear();
        console.log('============================'.green);
        console.log('   Selecciones una opción'.green);
        console.log('============================\n'.green);

        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir\n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question('Seleccione una opcion: ', (opt) => {
            readline.close();
            resolve(opt);
        })
    });
    
}

const pausa = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })        
    })
}

module.exports = {
    mostrarMenu,
    pausa
}
```

# 49. Nota para la siguiente clase

Inquirer
En la siguiente clase trabajaremos con el paquete inquirer, les dejo el enlace para que lo abran y lo lean antes de que lo empecemos a usar:

https://www.npmjs.com/package/inquirer

Recuerden revisar la documentación de estos paquetes, porque usualmente ahí nos dicen todo lo que pueden hacer.

# 50. Construir el menu interactivo-Inquirer

```js
// Archivo inquirer.js
const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: ['opt1', 'opt2', 'opt3']
    }
]

const inquirerMenu = async () => {
    //console.clear();
    console.log('============================'.green);
    console.log('   Selecciones una opción'.green);
    console.log('============================\n'.green);

    const opt = await inquirer.prompt(preguntas);
    return opt;
}

module.exports = {
    inquirerMenu
}
```

```js
// Archivo App.js
const { inquirerMenu } = require('./helpers/inquirer');
require('colors');

console.clear();

const main = async() => {
    console.log('Hola Mundo');
    let opt = '';
    do {
        opt = await inquirerMenu();
        console.log({opt});
    } while (opt !== '0');
}

main();
```

# 51. Opciones del menu interactivo

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
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Listar tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
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
    console.log('   Selecciones una opción'.green);
    console.log('============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () => {
    console.log('\n');
    await inquirer.prompt(enter);
}

module.exports = {
    inquirerMenu,
    pausa
}
```

```js
// Archivo app.js
const { inquirerMenu, pausa } = require('./helpers/inquirer');
require('colors');

console.clear();

const main = async() => {
    console.log('Hola Mundo');
    let opt = '';
    do {
        opt = await inquirerMenu();
        console.log({opt});
        await pausa();
    } while (opt !== '0');
}

main();
```

# 52. Logica para el manejo de las tareas por hacer

```js
// Archivo tarea.js
const {v4: uuid4} = require('uuid');

class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc) {
        this.id = uuid4();
        this.desc = desc;
        this.completadoEn = null;
    }
}

module.exports = Tarea;
```

```js
// Archivo tareas.js
class Tareas {
    _listado = {};
    constructor() {
        this._listado = {};
    }
}
module.exports = Tareas;
```

```js
// Archivo app.js
// Probando los modelos
const { inquirerMenu, pausa } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
require('colors');

const main = async() => {
    console.log('Hola Mundo');
    let opt = '';
    do {
        // opt = await inquirerMenu();
        // console.log({opt});
        const tareas = new Tareas();
        const tarea = new Tarea('Comprar comida');
        tareas._listado[tarea.id] = tarea;
        console.log(tareas);
        await pausa();
    } while (opt !== '0');
}

main();
```

# 53. Crear y listar tareas

```js
// Archivo app.js
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
require('colors');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log(tareas._listado);
                break;


        }
        await pausa();
    } while (opt !== '0');
}

main();
```

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
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Listar tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
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
    console.log('   Selecciones una opción'.green);
    console.log('============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () => {
    console.log('\n');
    await inquirer.prompt(enter);
}

const leerInput = async(message) => {
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
    const {desc} = await inquirer.prompt(question);
    return desc;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput
}
```

```js
// Archivo tareas.js
const Tarea = require("./tarea");

class Tareas {
    _listado = {};
    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
}
module.exports = Tareas;
```

```js
// Archivo tarea.js
const {v4: uuid4} = require('uuid');

class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc) {
        this.id = uuid4();
        this.desc = desc;
        this.completadoEn = null;
    }
}

module.exports = Tarea;
```

# 54. Transformar objeto a un arreglo - Detalles estéticos

```js
// Archivo tarea.js
const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
}
module.exports = Tareas;
```

```js
// Archivo app.js
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
require('colors');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log(tareas.listadoArr);
                break;


        }
        await pausa();
    } while (opt !== '0');
}

main();
```

```js
// Archivo inquirer.js, solo se modifico estilos en numero de las opciones
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

const leerInput = async(message) => {
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
    const {desc} = await inquirer.prompt(question);
    return desc;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput
}
```

# 55. Guardar tareas en un archivo de texto

```js
// Archivo guardarArchivo.js
const fs = require('fs');

const guardarDB = (data) => {
    const archivo = './db/data.json';
    fs.writeFileSync(archivo, JSON.stringify(data));
}

module.exports = {
    guardarDB
}
```

```js
// Archivo app.js
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const {guardarDB} = require('./helpers/guardarArchivo');
require('colors');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log(tareas.listadoArr);
                break;


        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== '0');
}

main();
```

# 56. Leer nuestra base de datos

```js
// Archivo app.js
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
require('colors');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log(tareas.listadoArr);
                break;
            
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== '0');
}

main();
```

```js
// Archivo guardarArchivo.js
const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = (data) => {
    
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data;

}

module.exports = {
    guardarDB,
    leerDB
}
```

```js
// Archivos tareas.js
const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
}
module.exports = Tareas;
```

# 57. Tarea - Cargar tareas
# 58. Listar tareas

```js
// Archivo app.js
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
require('colors');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log('\n')
                tareas.listadoCompleto(tareasDB);
                break;
            
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== '0');
}

main();
```

```js
// Archivo tareas.js
const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx}. ${desc} :: ${estado}`);
        })
    }
}
module.exports = Tareas;
```

# 59. Tareas completadas y pendientes - opciones del menu

```js
// Archivo tareas.js
const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    };

    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx}. ${desc} :: ${estado}`);
        })
    };
    listarPendientesCompletadas(completadas = true) {
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn}`)
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`)
                }
            }
        }
    )};
}
module.exports = Tareas;
```

```js
// Archivo app.js
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
require('colors');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log('\n')
                tareas.listadoCompleto(tareasDB);
                break;
            case '3':
                console.log('\n')
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                console.log('\n')
                tareas.listarPendientesCompletadas(false);
                break;

        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== '0');
}

main();
```

# 60. Listado para borrar
# 61. Confirmar y borrar tarea
# 62. Multiples selecciones
# 63. Marcar como completadas o pendientes las tareas

```js
// Archivo tareas.js
const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    };

    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx}. ${desc} :: ${estado}`);
        })
    };
    listarPendientesCompletadas(completadas = true) {
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`)
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`)
                }
            }
        }
    )};

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}
module.exports = Tareas;
```

```js
// Archivo app.js
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
require('colors');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log('\n')
                tareas.listadoCompleto(tareasDB);
                break;
            case '3':
                console.log('\n')
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                console.log('\n')
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                console.log('\n')
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                console.log('\n')
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id != '0') {
                    const ok = await confirmar('¿Estas seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }

                break;

        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== '0');
}

main();
```

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

# 64. Codigo fuente de la seccion

Aquí les dejo el código fuente de la sección como material adjunto y el enlace a mi repositorio de GitHub por si lo quieren descargar o clonar.

[Node-console-app-todo - v0.5.0](https://github.com/Klerith/node-console-app-todo/releases/tag/v0.5.0)

Nota:

Si el curso les gusta, por favor, ayúdenme a compartirlo con otras personas y si pueden tomar una foto de sus logros y etiquetarme en Twitter, se los agradecería mucho!

Mi usuario de Twitter es @fernando_her85

Otra nota:

Recuerden que si descargan mi código, deben de reconstruir los módulos de Node

npm install