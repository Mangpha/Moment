const { isAuthorized } = require('../../lib');
const { Posts } = require('../../models');
const { Users } = require('../../models');

module.exports = async (req, res) => {
	const post_id = req.params.id;
	const accessToken = req.cookies.accessToken;
	const { title, content, secret } = req.body;
	const findPost = await Posts.findByPk(post_id);
	if (!findPost) res.status(404).send({ isFixed: false });
	if (!accessToken) {
		res.status(401).send({ isFixed: false });
	} else {
		const checkUser = isAuthorized(accessToken);
		if (!checkUser) {
			res.status(400).send({ isFixed: false });
		} else {
			try {
				const searchUser = await Users.findOne({ where: { email: checkUser.email } });
				const user_id = searchUser.id;
				const origin = await Posts.findOne({ where: { user_id, id: post_id } });
				if (origin) {
					await Posts.update(
						{
							title: title ? title : origin.title,
							content: content ? content : origin.content,
							secret: secret ? secret : origin.secret,
							updatedAt: new Date(),
						},
						{
							where: {
								user_id,
								id: post_id,
							},
						},
					);
					res.status(200).send({ isFixed: true });
				} else res.status(404).send({ isFixed: false });
			} catch (err) {
				console.log(err);
			}
		}
	}
};
