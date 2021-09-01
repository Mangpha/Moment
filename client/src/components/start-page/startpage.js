import React, { useEffect, useState } from 'react';
import './startpage.css';

import { ReactComponent as Logo } from '../../assets/svg/13.svg';

import Footer from '../footer/footer';

export default function StartPage() {
	const [randomNum, setRandomNum] = useState(1);
	const getRandomPic = () => {
		let ranNum = parseInt(Math.random() * 30) + 1;
		setRandomNum(ranNum);
	};

	useEffect(() => {
		getRandomPic();
	}, []);

	return (
		<div className="startpage">
			{randomNum ? (
				<img className="startpage-logo" src={require(`../../assets/svg/${randomNum}.svg`).default} />
			) : (
				<div className="startpage-logo"></div>
			)}
			<div></div>
			<h1 className="startpage-title">Remember your moment in Moment forever.</h1>
			<a
				href="/main"
				className="startpage-btn
						   startpage-btn-color
						   startpage-btn-animation"
			>
				Start
			</a>
			<Footer />
		</div>
	);
}
