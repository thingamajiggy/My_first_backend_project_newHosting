\c nc_news

UPDATE articles SET votes = $1 WHERE votes = $2 RETURNING *;