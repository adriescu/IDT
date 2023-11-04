const express = require("express");
const app = express();
const path = require("path");
const port = 12012;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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