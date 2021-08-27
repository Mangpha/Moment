const { Posts, Users, post_like } = require('../../models');
const { isAuthorized } = require('../../lib/index');

module.exports = async (req, res) => {
  // d
  const post_id = req.params.id;
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    res.status(400).send({ isLike: false });
  } else {
    const accessTokenData = isAuthorized(accessToken);
    const userId = await Users.findOne({
      where: { email: accessTokenData.email, nickname: accessTokenData.nickname }
    });
    if (!userId) {
      res.status(401).send({ isLike: false });
    } else {
      const postId = await Posts.findOne({
        where: { id: post_id }
      });
      await post_like.update({
        post_id: postId,
        user_id: userId
      });
    }
  }
}