const { Users } = require('../../models');

module.exports = async (req, res) => {
  const { email, password, nickname } = req.body;

  if (!email || !password || !nickname) {
    res.status(400).json({ isSignup: false });
  }

  const userInfo = await Users.findOne({
    where: { email: req.body.email }
  });

  if (userInfo) {
    res.status(400).json({ isSignup: false });
  } else {
    await Users.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: req.body.password,
      created_at: new Date(),
      updated_at: new Date(),
    });
    res.status(200).json({ isSignup: true });
  }
}