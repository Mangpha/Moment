const { Posts, Users, post_like } = require('../../models');
const { isAuthorized } = require('../../lib/index');

module.exports = async (req, res) => {
	const post_id = req.params.id;
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		res.status(401).send({ isLike: false });
	} else {
		const accessTokenData = isAuthorized(accessToken);
		if (!accessTokenData) {
			res.status(400).send({ isLike: false });
		} else {
			try {
				const user = await Users.findOne({
					where: { email: accessTokenData.email, nickname: accessTokenData.nickname },
				});
				const post = await Posts.findOne({
					where: { id: post_id, secret: false },
				});
				const isLike = await post_like.findOne({
					where: {
						post_id: post.id,
						user_id: user.id,
					},
				});
				if (!isLike) {
					await post_like.create({
						post_id: post.id,
						user_id: user.id,
					});
					await Posts.increment(
						'like_count',
						{ by: 1, where: { id: post.id } }
					);
					res.status(200).json({ isLike: true });
				} else {
					await Posts.decrement(
						'like_count',
						{ by: 1, where: { id: post.id } }
					);
					await post_like.destroy({
						where: {
							post_id: post.id,
							user_id: user.id,
						}
					});
					res.status(202).json({ isLike: false });
				}
			} catch (err) {
				console.log(err);
			}
		}
	}
};
