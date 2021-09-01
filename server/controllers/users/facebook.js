const axios = require('axios');
const { generateAccessToken, generateRefreshToken } = require('../../lib');
const { Users } = require('../../models');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
	try {
		const data = await axios({
			url: 'https://graph.facebook.com/v11.0/oauth/access_token',
			method: 'get',
			params: {
				client_id: process.env.FB_CLIENT_ID,
				redirect_uri: `${process.env.END_POINT}/users/facebook`,
				client_secret: process.env.FB_CLIENT_SECRET,
				code: req.query.code,
			},
		});
		const accessToken = data.data.access_token;
		const getUser = await axios({
			url: 'https://graph.facebook.com/me',
			method: 'get',
			params: {
				fields: 'id,name,email,picture',
				access_token: accessToken,
			},
		});
		// ex) getUser.data = {
		// 	id: '2109023232584856',
		// 	name: '전병희',
		// 	email: '8350130@gmail.com',
		// 	picture: {
		// 		data: {
		// 			height: 50,
		// 			is_silhouette: true,
		// 			url: 'https://scontent-ssn1-1.xx.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=12b3be&_nc_ohc=loh4S-lnfqkAX8KMxti&_nc_ht=scontent-ssn1-1.xx&edm=AP4hL3IEAAAA&oh=f554cc47fd5eaafa947ae54b20284a35&oe=614FF6B8',
		// 			width: 50,
		// 		},
		// 	},
		// };
		const payload = {
			data: getUser.data,
		};
		const searchUser = await Users.findOne({
			where: {
				email: payload.data.id,
			},
		});
		if (!searchUser) {
			await Users.create({
				avatar: payload.data.picture.data.url,
				email: payload.data.id,
				nickname: payload.data.name,
				password: accessToken,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
		const generatePayload = {
			email: payload.data.id,
			nickname: payload.data.name,
		};
		const currentAccessToken = generateAccessToken(generatePayload);
		const currentRefreshToken = generateRefreshToken(generatePayload);
		res.set('refreshToken', currentRefreshToken).status(200);
		res.cookie('accessToken', currentAccessToken, { sameSite: 'none', secure: true, httpOnly: true }).redirect(
			process.env.GO_TO_HOME + '/main',
		);
	} catch (err) {
		console.log(err);
	}
};
