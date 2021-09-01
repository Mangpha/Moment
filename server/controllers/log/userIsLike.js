const { post_like, Users } = require('../../models');
const { isAuthorized } = require('../../lib');

module.exports = async (req, res) => {
	if (req.cookies.accessToken) {
		const userData = isAuthorized(req.cookies.accessToken);
		const findUserId = await Users.findOne({ where: { email: userData.email } });
		if (findUserId) {
			const userLikePost = await post_like.findOne({ where: { post_id: req.params.id, user_id: findUserId.id } });
			if (userLikePost) res.status(200).send({ userLikePost: true });
			else res.status(404).send({ userLikePost: false });
		} else {
			res.status(400).send({ userLikePost: false });
		}
	} else {
		res.status(401).send({ userLikePost: false });
	}
};
