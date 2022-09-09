const { findingTopics, findingArticleId, findingUsers, patchingArticleId, findingArticles, findingComments, postingComments } = require('../models/news.models.js')

exports.getTopics = (req, res, next) => {
    findingTopics().then((arrayOfTopics) => {
        res.status(200).send({ topics: arrayOfTopics })
    })
        .catch((err) => {
            next(err);
        });
}

exports.getUsers = (req, res, next) => {
    findingUsers().then((arrayOfUsers) => {
        res.status(200).send({ arrayOfusers })
    })
        .catch((err) => {
            next(err);
        })
}

exports.getArticles = (req, res, next) => {
    const { topic } = req.query;

    findingArticles(topic).then((result) => {
        res.status(200).send({ result })
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

exports.patchArticleId = (req, res, next) => {
    patchingArticleId(req.params.article_id, req.body)
        .then((updatedArticle) => {
            res.status(201).send({ updatedArticle });
        })
        .catch((err) => {
            next(err);
        });
}

exports.getComments = (req, res, next) => {
    findingComments(req.params.article_id)
        .then((selectedComments) => {
            res.status(200).send({ selectedComments })
        })
        .catch((err) => {
            next(err);
        });
}

exports.postComments = (req, res, next) => {
    const { body } = req;
    postingComments(body, req.params.article_id).then(
        (updateComment) => {
            res.status(201).send({ updateComment })
        }
    )
        .catch((err) => {
            next(err);
        })
}

exports.getUsers = (req, res, next) => {
    findingUsers().then((arrayOfUsers) => {
        res.status(200).send({ users: arrayOfUsers })
    })
        .catch((err) => {
            next(err);
        });
}

exports.code404NotFound = (req, res) => {
    res.status(404).send({ msg: "Page not found" });
};