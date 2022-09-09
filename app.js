const express = require('express');
const { getTopics, getArticleId, getUsers, patchArticleId, getArticles, getComments, postComments, code404NotFound } = require('./controllers/news.controllers.js')

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/users", getUsers);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleId);
app.get("/api/articles/:article_id/comments", getComments);
app.patch("/api/articles/:article_id", patchArticleId);
app.post("/api/articles/:article_id/comments", postComments)

app.use("*", code404NotFound);

app.use((err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    } else next(err);
});

app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Invalid input' });
    } else next(err);
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: 'Internal Server Error' });
});

module.exports = app;