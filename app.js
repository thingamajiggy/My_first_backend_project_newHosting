const express = require('express');
const { getTopics } = require('./controllers/news.controllers.js')
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.use((err, req, res, next) => {
    res.status(err.status).send({ msg: err.msg })
})

module.exports = app;