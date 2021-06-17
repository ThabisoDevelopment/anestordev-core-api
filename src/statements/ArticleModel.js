/** SQL Query statement to get Latest updated artcles */
export const queryLatest = `
SELECT 
    article.id,
    article.content,
    article.likable,
    article.commentable,
    article.contributable,
    article.show_views,
    article.created_at,
    article.updated_at,
    user.id AS uid,
    user.name,
    user.img_url
FROM articles AS article
INNER JOIN users AS user
WHERE article.published = 1
AND article.user_id = user.id
ORDER BY article.updated_at DESC
LIMIT 10`

/** Query Single article by ID */
export const querySingleById = `
SELECT *
FROM articles AS article
WHERE article.id = ?
`
