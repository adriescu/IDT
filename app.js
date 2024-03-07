const express = require("express"); // Express es la librería que se encarga de levantar el servidor y de administrar las peticiones al servidor
const app = express();
const path = require("path");
const port = 12012;
const session = require("express-session"); // Librerpia para administrar las sesiones de usuario
const MySQLStore = require('express-mysql-session')(session); // Librería para guardar sesiones de usuario

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// Los datos de la base de datos en la que las sesiones se van a guardar
const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'inv'
};

const sessionStore = new MySQLStore(options);

app.use(session({
	key: 'session_cookie',
	secret: 'secret_aaa',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
}));

// Definir la carpeta publica que usara express
app.use(express.static('public'));
console.log(path.resolve( __dirname + '/public'));
// app.use(express.static('public'));

// Configurar express para que use ejs
app.set('view engine', 'ejs');

// Configurar la carpeta donde se encuentran las vistas
app.set('views', __dirname + "/modules/views")

// Configurar el puerto por donde la app va a escuchar
app.listen(port, () => {
    console.log(`App iniciada en el puerto ${port}`);
})

// Redirigir todas las peticiones al archivo "routes.js"
app.use('/', require('./routes'))

// Si una petición no coincide con ninguna ruta del archivo, redirigir a "/"
app.use((req, res) => {
    res.redirect('/');
});