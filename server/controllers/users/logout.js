module.exports = (req, res) => {
  res.status(200).json({ isLogout: true });
  //로그아웃 시 쿠키를 삭제하는 것은...?
}