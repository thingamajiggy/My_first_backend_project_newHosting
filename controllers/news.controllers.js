const { findingTopics } = require('../models/news.models.js')

exports.getTopics = (req, res, next) => {
    findingTopics().then((arrayOfTopics) => {
        res.status(200).send({ topics: arrayOfTopics })
    });
}