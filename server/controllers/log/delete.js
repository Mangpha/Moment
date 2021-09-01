const { isAuthorized } = require('../../lib');
const { Posts, Users } = require('../../models');

module.exports = async (req, res) => {
	const post_id = req.params.id;
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		res.status(401).send({ isDel: false });
	} else {
		const findPost = await Posts.findByPk(post_id);
		if (!findPost) res.status(404).send({ isDel: false });
		else {
			const checkUser = isAuthorized(accessToken);
			if (!checkUser) {
				res.status(400).send({ isDel: false });
			} else {
				try {
					const searchUser = await Users.findOne({ where: { email: checkUser.email } });
					const user_id = searchUser.id;
					const searchPost = await Posts.findOne({ where: { id: post_id, user_id } });
					if (searchPost) {
						await Posts.destroy({
							where: {
								id: post_id,
								user_id,
							},
						});
					} else res.status(404).send({ isDel: false });
					res.status(200).send({ isDel: true });
				} catch (err) {
					console.log(err);
				}
			}
		}
	}
};
