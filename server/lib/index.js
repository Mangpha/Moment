const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	generateAccessToken: (data) => {
		return jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn: '1h' });
	},
	generateRefreshToken: (data) => {
		return jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: '7d' });
	},
	isAuthorized: (accessToken) => {
		return jwt.verify(accessToken, process.env.ACCESS_SECRET);
	}
};
