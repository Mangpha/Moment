import React, { useState, useEffect } from 'react';

import './sideimage.css';

export default function SideImage(props) {
	const [randomNum, setRandomNum] = useState(1);
	// 랜덤 수
	const getRandomPic = () => {
		let ranNum = Math.floor(Math.random() * 12) + 1;
		setRandomNum(ranNum);
	};

	useEffect(() => {
		getRandomPic();
	}, []);
	return (
		<div className="side-image-container">
			<img src={require(`../../static/images/composition-${randomNum}.png`).default} className="side-image"></img>
		</div>
	);
}
