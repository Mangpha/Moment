const { Users, Posts } = require('../../models');
const { isAuthorized } = require('../../lib/index');

module.exports = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const num = req.params.num || 1;
  let offset = 4 * (num - 1);
  if (accessToken === undefined) {
    res.status(401).json({ data: null });
  } else {
    const accessTokenData = isAuthorized(accessToken);
    if (!accessTokenData) res.status(400).send({ data: null });
    else {
      try {
        const userInfo = await Users.findOne({
          where: { email: accessTokenData.email, nickname: accessTokenData.nickname },
        });
        const pageData = await Posts.findAndCountAll({
          offset: offset,
          limit: 4,
          order: [['createdAt', 'DESC']],
          attributes: ['id', 'title', 'content', 'updatedAt', 'like_count', 'user_id'],
          where: { user_id: userInfo.id },
          include: [{ model: Users, attributes: ['nickname'] }],
        });
        if (offset + 1 <= pageData.count) {
          res.status(200).json({ data: pageData });
        } else {
          res.status(404).json({ message: "end!!!" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};