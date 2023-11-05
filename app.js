const express = require("express");
const app = express();
const path = require("path");
const port = 12012;
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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


app.use(express.static('public'));
console.log(path.resolve( __dirname + '/public'));
// app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + "/modules/views")

app.listen(port, () => {
    console.log(`App iniciada en el puerto ${port}`);
})

app.use('/', require('./routes'))

app.use((req, res) => {
    res.redirect('/');
});