const db = require('../db/connection');

exports.findingTopics = () => {
    return db.query(`SELECT topics.slug, topics.description FROM topics;`)
        .then((result) => {
            return result.rows;
        })
}

exports.findingArticleId = (articleId) => {
    return db.query(`
        SELECT
            author,
            title,
            article_id,
            body,
            topic,
            created_at,
            votes
        FROM articles
        WHERE article_id = $1;`, [articleId])
        .then(({ rows }) => {
            const article = rows[0];
            if (!article) {
                return Promise.reject({
                    status: 404,
                    msg: `Page not found`,
                });
            }
            return article;
        });
}

exports.findingUsers = () => {
    return db.query(`SELECT * FROM users`).then((result) => {
        return result.rows
    })
}

