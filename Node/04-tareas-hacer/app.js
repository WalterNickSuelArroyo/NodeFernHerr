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