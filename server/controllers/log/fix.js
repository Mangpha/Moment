const { Posts } = require('../../models');

module.exports = async (req, res) => {
	const post_id = req.params.id;
	const accessToken = req.cookies.accessToken;
	const { title, content } = req.body;
	const findPost = await Posts.findOne({ where: { id: post_id } });
	if (!findPost) res.status(404).send({ isFixed: false });
	if (!accessToken) {
		res.status(401).send({ isFixed: false });
	} else {
		// token verify
		// const userid = tokenverify(accessToken)
		// if (!userid) {
		// 	res.status(400).send({ isFixed: false });
		// } else {
		try {
			const origin = await Posts.findOne({ where: { user_id: userid, id: post_id } });
			await Posts.update({
				title: title ? title : origin.title,
				content: content ? content : origin.content,
			});
			res.status(200).send({ isFixed: true });
		} catch (err) {
			console.log(err);
		}
		// }
	}
};