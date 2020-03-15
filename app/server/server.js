const express = require('express')
const app = express()
const port = 5500
const apiRouter = require("./routes/api")
const adminRouter = require("./routes/admin")

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/static', express.static('../client/public'));
app.use('/api', apiRouter);
app.use('/admin', adminRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});