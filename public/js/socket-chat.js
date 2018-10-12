let socket = io();
let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', () => {
    console.log('Conectado al servidor');

    socket.emit('entraChat', usuario, resp => {
        console.log('Usuarios conectados: ', resp);
    });
});

// escuchar
socket.on('disconnect', () => {
    console.log('Perdimos conexión con el servidor');
});


/* Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, resp => {
    console.log('respuesta server: ', resp);
});*/

// Escuchar información
socket.on('crearMensaje', mensaje => {
    console.log('Servidor: ', mensaje);
});

//Cuando un usuario entra o sale del chat
socket.on('listaPersonas', personas => {
    console.log(personas);
});

socket.on('mensajePrivado', mensaje => {
    console.log('Mensaje privado: ', mensaje);
});