//CALLBACK
setTimeout(function() {
    console.log('Hola Mundo');
}, 3000);

//CON FUNCION DE FLECHA
setTimeout(() => {
    console.log('Hola Mundo');
}, 2000);


const getUsuarioByID = (id) => {
    const usuario = {
        id,
        nombre: 'Fernando'
    }
    setTimeout(() => {
        console.log(usuario);
    }, 4000);
}
//getUsuarioByID(10);

getUsuarioByID(10, () => {
    console.log('hola mundo');
});
/*Vemos que no se dispara el hola mundo, para ello debemos hacer lo siguiente

const getUsuarioByID = (id, callback) => {
    const usuario = {
        id,
        nombre: 'Fernando'
    }
    setTimeout(() => {
        callback(usuario);
    }, 4000);
}
//getUsuarioByID(10);

getUsuarioByID(10, () => {
    console.log('hola mundo');
});

Ahora la salida sale el hola mundo, pero ahora yo quiero imprimir el usuario . Eso lo hariamos asi:

const getUsuarioByID = (id) => {
    const usuario = {
        id,
        nombre: 'Fernando'
    }
    setTimeout(() => {
        console.log(usuario);
    }, 4000);
}
//getUsuarioByID(10);

getUsuarioByID(10, (usuario) => {
    console.log(usuario);
});
*/

function imprimirMensaje(mensaje, callback) {
    setTimeout(() => {
      // Imprime el mensaje
      console.log(mensaje);
  
      // Ejecuta el callback
      callback();
    }, 1000);
  }
  
  // Llamada a la función
  imprimirMensaje("Hola, mundo!", () => {
    // Hace algo después de imprimir el mensaje
    console.log("¡Listo!");
  });
  



