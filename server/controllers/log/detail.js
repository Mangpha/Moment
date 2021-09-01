const { Posts, Users } = require('../../models');

module.exports = async (req, res) => {
	const post_id = req.params.id;
	try {
		const post = await Posts.findOne({ where: { id: post_id, secret: false } });
		const userInfo = await Users.findByPk(post.user_id);
		if (!post) {
			res.status(404).json({ data: null });
		} else {
			const { id, title, content, updatedAt, like_count } = post;
			res.status(200).json({
				data: {
					id,
					title,
					content,
					author: userInfo.nickname,
					updated: updatedAt,
					like_count,
				},
			});
		}
	} catch (err) {
		console.log(err);
	}
};
