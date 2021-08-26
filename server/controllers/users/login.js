const { Users } = require('../../models');
const { generateAccessToken, generateRefreshToken } = require('../../lib/index');

module.exports = async (req, res) => {
  const userInfo = await Users.findOne({
    where: { email: req.body.email, password: req.body.password }
  });

  if (!userInfo) {
    res.status(401).json({ isLogin: false, data: null });
  } else {
    const { email, nickname } = userInfo;
    const accessToken = generateAccessToken({ email, nickname });
    const refreshToken = generateRefreshToken({ email, nickname });

    res.cookie('accessToken', accessToken, {
      sameSite: 'none',
      secure: true,
      httpOnly: true
    });

    res.set({ 'refreshToken': refreshToken }).send()
    res.status(200).json({ isLogin: true, data: { email: email, nickname: nickname } });
  }
}