const db = require('../db/connection');

exports.findingTopics = () => {
    return db.query(`SELECT topics.slug, topics.description FROM topics;`)
    .then((result) => {
        return result.rows;
    })
}