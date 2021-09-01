const { isAuthorized } = require('../../lib');
const { Posts, Users } = require('../../models');

module.exports = async (req, res) => {
	const { title, content, secret } = req.body;
	const accessToken = req.cookies.accessToken;
	console.log(accessToken);
	if (!accessToken) {
		res.status(401).send({ isSubmit: false });
	} else {
		const checkUser = isAuthorized(accessToken);
		if (!checkUser) {
			res.status(400).send({ isSubmit: false });
		} else {
			try {
				const searchUser = await Users.findOne({
					where: {
						email: checkUser.email,
					},
				});
				console.log('find user_id: ' + searchUser.id);
				const payload = {
					title,
					content,
					secret,
					user_id: searchUser.id,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				console.log(payload);
				await Posts.create({
					title,
					content,
					secret,
					createdAt: new Date() + 9,
					updatedAt: new Date() + 9,
					user_id: searchUser.id,
				});
				res.status(200).send({ isSubmit: true });
			} catch (err) {
				console.log(err);
			}
		}
	}
};
