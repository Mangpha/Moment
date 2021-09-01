const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const cookie_parser = require('cookie-parser');
const PORT = process.env.PORT || 8080;
const userRoute = require('./routes/users');
const logsRoute = require('./routes/logs');

const app = express();

app.use(
	cors({
		origin: true,
		credentials: true,
		methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
		exposedHeaders: ['refreshToken'],
	}),
);
app.use(cookie_parser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoute);
app.use('/log', logsRoute);
app.get('/', (_, res) => res.send('Hello World?'));

app.listen(PORT, () => console.log(`Server is Running ${PORT}`));
