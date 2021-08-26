const { Posts } = require('../../models');

module.exports = async (req, res) => {
	const { title, content, secret } = req.body;
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		res.status(401).send({ isSubmit: false });
	} else {
		// token verify
		// const userid = tokenverify(accessToken)
		if (!userid) {
			res.status(400).send({ isSubmit: false });
		} else {
			await Posts.create({
				// user_id,
				title,
				content,
				secret,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			res.status(200).send({ isSubmit: true });
		}
	}
};
