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

exports.findingArticles = ({topic: topicFilter, author: authorFilter, sort = 'Date'}) => {
    const topicQueryArguments = []

    if (topicFilter) {
        topicQueryArguments.push(topicFilter)
    }

    return db.query(`SELECT * FROM topics ${topicFilter ? 'WHERE slug = $1' : ''} ;`, topicQueryArguments)
        .then(
            function (topicResult) {
                if (topicResult.rows.length === 0) {
                    return Promise.reject({
                        status: 404,
                        msg: `Page not found`,
                    });
                }

                const queryArguments = [];
                let whereClause = ''
                let orderBy = ''

                if (topicFilter && authorFilter) {
                    queryArguments.push(topicFilter, authorFilter)
                    whereClause = 'WHERE topic = $1 AND author = $2'
                } else if (topicFilter) {
                    queryArguments.push(topicFilter)
                    whereClause = 'WHERE topic = $1'
                } else if (authorFilter) {
                    queryArguments.push(authorFilter)
                    whereClause = 'WHERE author = $1'
                }

                if (sort === 'Date' || !sort) {
                    orderBy = 'created_at';
                    direction = 'DESC';
                } else if (sort === 'Alphabetical') {
                    orderBy = 'title';
                    direction = 'ASC';
                }

                return db.query(`SELECT * FROM articles ${whereClause ? whereClause : ''} ORDER BY ${orderBy} ${direction};`, queryArguments)
                    .then((result) => {
                        return result.rows;
                    })
            })
}

exports.searchArticles = (searchTerm = "") => {
    return db.query(`
        SELECT * FROM articles WHERE title ILIKE $1
    `, [`%${searchTerm.trim()}%`]).then(({ rows }) => {
        return rows;
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



