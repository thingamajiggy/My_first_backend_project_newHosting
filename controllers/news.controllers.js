const { findingTopics, findingArticleId, findingUsers } = require('../models/news.models.js')

exports.getTopics = (req, res, next) => {
    findingTopics().then((arrayOfTopics) => {
        res.status(200).send({ topics: arrayOfTopics })
    })
        .catch((err) => {
            next(err);
        });
}

exports.getArticleId = (req, res, next) => {
    const { article_id } = req.params

    findingArticleId(article_id).then((article) => {
        res.status(200).send(article)
    })
        .catch((err) => {
            next(err);
        });

}

exports.code404NotFound = (req, res) => {
    res.status(404).send({ msg: "Page not found" });
};