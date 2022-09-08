\c nc_news

 SELECT
    author,
    title,
    article_id,
    body,
    topic,
    created_at,
    votes,
    (
        SELECT COUNT(comment_id) FROM comments WHERE article_id
    ) 
    AS comment_count
    FROM articles
    WHERE article_id
    (WHERE created_at = $2 ORDER BY created_at DESC)
    ;