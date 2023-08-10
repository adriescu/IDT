const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const listRouter = express.Router();
const itemRoute = require('./src/routes/item');
const listRoute = require('./src/routes/list');

app.use(express.static(__dirname + "./public"));
app.set('view engine', 'ejs');
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './src/views/index.html'));
})

app.use('/item', itemRoute);

app.use('/list', listRoute);

app.use((req, res) => {
    res.redirect('../');
});