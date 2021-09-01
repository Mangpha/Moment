const { isAuthorized, generateAccessToken } = require('../../lib');
const { Users } = require('../../models');

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) res.status(401).send({ profileFix: false });
	else {
		const checkUser = isAuthorized(accessToken);
		if (!checkUser) res.status(400).send({ profileFix: false });
		else {
			const { nickname, password } = req.body;
			const origin = await Users.findOne({
				where: {
					email: checkUser.email,
					nickname: checkUser.nickname,
				},
			});
			await Users.update(
				{
					nickname: nickname ? nickname : origin.nickname,
					password: password ? password : origin.password,
					updatedAt: new Date(),
				},
				{
					where: {
						id: origin.id,
					},
				},
			);
			const originEmail = origin.email;
			const fixAccessToken = generateAccessToken({
				email: originEmail,
				nickname: nickname ? nickname : origin.nickname,
			});

			res.cookie('accessToken', fixAccessToken, {
				sameSite: 'none',
				secure: true,
				httpOnly: true,
			});
			res.status(200).send({ profileFix: true });
		}
	}
};
