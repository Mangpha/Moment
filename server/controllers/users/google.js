const axios = require('axios');
const { Users } = require('../../models');
const dotenv = require('dotenv');
const { generateRefreshToken, generateAccessToken } = require('../../lib');
dotenv.config();

module.exports = async (req, res) => {
	try {
		const googleCode = await axios({
			url: 'https://oauth2.googleapis.com/token',
			method: 'post',
			data: {
				code: req.query.code,
				client_id: process.env.GOOGLE_CLIENT_ID,
				client_secret: process.env.GOOGLE_CLIENT_SECRET,
				redirect_uri: `${process.env.END_POINT}/users/google`,
				grant_type: 'authorization_code',
			},
		});
		const googleAccessToken = googleCode.data.access_token;
		const googleUserInfo = await axios({
			url: 'https://www.googleapis.com/oauth2/v3/userinfo',
			method: 'get',
			params: {
				access_token: googleAccessToken,
				scope: 'https://www.googleapis.com/auth/userinfo.email',
			},
		});
		const searchUser = await Users.findOne({
			where: { email: googleUserInfo.data.sub },
		});
		if (!searchUser) {
			await Users.create({
				avatar: googleUserInfo.data.picture,
				email: googleUserInfo.data.sub,
				nickname: googleUserInfo.data.email,
				password: googleAccessToken,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
		const payload = {
			email: googleUserInfo.data.sub,
			nickname: googleUserInfo.data.email,
		};
		const accessToken = generateAccessToken(payload);
		const refreshToken = generateRefreshToken(payload);
		res.set('refreshToken', refreshToken).status(200);
		res.cookie('accessToken', accessToken, { sameSite: 'none', secure: true, httpOnly: true }).redirect(
			process.env.GO_TO_HOME + '/main',
		);
	} catch (err) {
		console.log(err);
	}
	// data structure
	// googleUserInfo.data = {
	// 	"sub": "109577084072413087857",
	// 	"picture": "https://lh3.googleusercontent.com/a-/AOh14Gg-EovSrHAX8N0U99pH5RNTYQWT8VsWFrZTahRlpA=s96-c",
	// 	"email": "8350130@gmail.com",
	// 	"email_verified": true
	//   }
};
