const express = require('express')
const app = express()
const cors = require('cors')
const port = 3376
const apiRouter = require("./routes/api")
const adminRouter = require("./routes/admin")

app.set('view engine', 'ejs')
app.set("views", "/templates")
app.use(cors())
app.use(express.urlencoded())

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/static', express.static('./public'));
app.use('/api', apiRouter);
app.use('/admin', adminRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});