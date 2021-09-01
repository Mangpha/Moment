const { Posts, Users } = require('../../models');
const { isAuthorized } = require('../../lib/index');

module.exports = async (req, res) => {
  const post_id = req.params.id;
  const accessToken = req.cookies.accessToken;
  if (accessToken === undefined) {
    res.status(401).json({ data: null });
  } else {
    const accessTokenData = isAuthorized(accessToken);
    if (!accessTokenData) res.status(400).send({ data: null });
    else {
      try {
        const post = await Posts.findByPk(post_id);
        const userInfo = await Users.findByPk(post.user_id);
        if (!post) {
          res.status(404).json({ data: null });
        } else {
          const { id, title, content, updatedAt, like_count } = post;
          res.status(200).json({
            data: {
              id,
              title,
              content,
              author: userInfo.nickname,
              updated: updatedAt,
              like_count,
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
