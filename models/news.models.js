const db = require('../db/connection');

exports.findingTopics = () => {
    return db.query(`SELECT topics.slug, topics.description FROM topics;`)
        .then((result) => {
            return result.rows;
        })
}

exports.findingUsers = () => {
    return db.query(`SELECT * FROM users;`)
        .then((result) => {
            return result.rows;
        })
}

exports.findingArticles = (topicFilter) => {
    const queryArguments = []

    if (topicFilter) {
        queryArguments.push(topicFilter)
    }

    return db.query(`SELECT * FROM topics ${topicFilter ? 'WHERE slug = $1' : ''} ;`, queryArguments)
        .then(
            function (topicResult) {

                if (topicResult.rows.length === 0) {
                    return Promise.reject({
                        status: 404,
                        msg: `Page not found`,
                    });
                }

                return db.query(`SELECT * FROM articles ${topicFilter ? 'WHERE topic = $1' : ''} ORDER BY created_at DESC;`, queryArguments)
                    .then((result) => {
                        return result.rows;
                    })
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
            votes,
            (
                SELECT COUNT(comment_id) FROM comments WHERE article_id = $1
            ) AS comment_count
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

exports.patchingArticleId = (articleId, voteCount) => {
    const { inc_votes } = voteCount;

    return db.query(
        `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`, [inc_votes, articleId]
    )
        .then((result) => {
            return result.rows[0];
        })
}

exports.findingComments = (articleId) => {

    return db.query('SELECT * FROM articles WHERE article_id = $1', [articleId])

        .then(
            function (articleResult) {

                if (articleResult.rows.length === 0) {
                    return Promise.reject({
                        status: 404,
                        msg: `Page not found`,
                    });
                }

                return db.query(`SELECT * FROM comments WHERE article_id = $1;`, [articleId])
                    .then((result) => {
                        return result.rows;
                    });
            });


}

exports.postingComments = ({ body, author }, articleId) => {

    return db.query(
        `INSERT INTO comments (
            body,
            author,
            article_id
        ) VALUES (
            $1,
            $2,
            $3
        ) RETURNING *;`, [body, author, articleId]
    )
        .then((result) => {
            return result.rows[0];
        })
}

exports.findingUsers = () => {
    return db.query(`SELECT * FROM users;`)
        .then((result) => {
            return result.rows
        })
}



