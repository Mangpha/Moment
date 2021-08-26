const { Users } = require('../../models');
const { isAuthorized } = require('../../lib/index');

module.exports = async (req, res) => {
  const accessToken = req.headers.cookie.accessToken;
  // accessToken이 저게 확실한 가?
  if (accessToken === undefined) {
    res.status(400).json({ data: null });
  } else {
    const accessTokenData = isAuthorized(accessToken);
    const userInfo = await Users.findOne({
      where: { email: accessTokenData.email }
    });
    //토큰을 확인해주는 함수가 필요하다
    if (!userInfo) {
      res.status(401).json({ data: null });
    } else {
      const { email, nickname } = userInfo;
      res.status(200).json({
        data: { email: email, nickname: nickname }
      });
    }
  }
}