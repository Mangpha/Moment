import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mypage.css';
import Spinner from '../spinner/spinner';
import { FiPaperclip } from 'react-icons/fi';
import { RiHomeHeartLine, RiBookMarkLine, RiInformationLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const Mypage = () => {
	const [userInfo, setUserInfo] = useState({ avatar: '', email: '', nickname: '' });
	const [isLoading, setIsLoading] = useState(false);
	const [randomNum, setRandomNum] = useState(1);
	const getRandomPic = () => {
		let ranNum = parseInt(Math.random() * 31) + 1;
		setRandomNum(ranNum);
	};
	const getUsersInfo = async () => {
		console.log(1);
		const user = await axios.get(`${ENDPOINT}/users/profile`, { withCredentials: true });
		const { avatar, email, nickname } = user.data.data;
		setUserInfo({ email, nickname, avatar });
	};
	useEffect(() => {
		getRandomPic();
		getUsersInfo();
	}, []);

	useEffect(() => {
		if (!isLoading) {
			setTimeout(() => {
				setIsLoading(true);
			}, 2000);
		}
	}, [isLoading]);
	if (!isLoading) return <Spinner />;

	const { email, nickname, avatar } = userInfo;
	return (
		<div className="my-page-card-container">
			<div className="my-page-card-image-container">
				{avatar === null ? (
					<img src={require(`../../assets/svg/${randomNum}.svg`).default} />
				) : (
					<img src={avatar} />
				)}
			</div>
			<div className="my-page-card-info-container">
				<h1>{nickname}</h1>
				<div className="my-page-card-info-container-sec">
					<h2>{email}</h2>
				</div>
				<button className="my-page-card-info-btn">
					<Link to="/log">
						<FiPaperclip size={30} />
					</Link>
				</button>
				<div className="my-page-card-info-welcome-container">
					<p>Welcome! What do you want to write today?</p>
				</div>
			</div>
			<div className="my-page-card-info-options">
				<Link to="/main/recent">
					<div className="my-page-card-info-options-icon">
						<RiHomeHeartLine size={25} />
						<button>Moment</button>
					</div>
				</Link>
				<Link to="/myprofile/mypost">
					<div className="my-page-card-info-options-icon">
						<RiBookMarkLine size={25} />
						<button>My post</button>
					</div>
				</Link>
				<Link to="/fixprofile">
					<div className="my-page-card-info-options-icon">
						<RiInformationLine size={25} />
						<button>Infomation</button>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Mypage;
