const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.use(express.static(__dirname + "./public"));

app.set('view engine', 'ejs');
app.set('views', __dirname + "/modules")

app.listen(port, () => {
    console.log(`App iniciada en el puerto ${port}`);
})

app.use('/', require('./routes'))

app.use((req, res) => {
    res.redirect('/');
});