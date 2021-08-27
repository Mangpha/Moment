const { Posts, Users, post_like } = require('../../models');

module.exports = async (req, res) => {
  const post_id = req.params.id;
  const post = await Posts.findOne({
    where: { id: post_id }
  });
  const userInfo = await Users.findOne({
    where: { id: post.user_id }
  });
  const likes = await post_like.findAll({
    where: { post_id: post.id }
  });
  if (!post) {
    res.status(404).json({ data: null });
  } else {
    const { id, title, content, updated_at } = post;
    res.status(200).json({
      data: {
        id: id,
        title: title,
        content: content,
        author: userInfo.nickname,
        updated: updated_at,
        like: len(likes)
      }
    })
  }
}