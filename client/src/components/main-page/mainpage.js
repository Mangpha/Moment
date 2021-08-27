import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './mainpage.css';

import image1 from '../../static/images/composition-10.png';
import image2 from '../../static/images/composition-11.png';
import image3 from '../../static/images/composition-21.png';
import image4 from '../../static/images/composition-22.png';

export default function MainPage() {
	// const [recent, setRecent] = useState('');
	// useEffect(() => {
	// 	axios.get(`https://api.m0ment.be/log/recent/page/${num}`).then(res => console.log(res));
	// }, []);

	return (
		<>
			<div className="mainpage">
				<h1 className="mainpage-title">Make your moments forever.</h1>
			</div>
			<div className="mainpage-recent-container">
				<div className="mainpage-recent-item">
					<img src={image1} className="mainpage-recent-image" />
				</div>

				<div className="mainpage-recent-item">
					<img src={image2} className="mainpage-recent-image" />
				</div>

				<div className="mainpage-recent-item">
					<img src={image3} className="mainpage-recent-image" />
				</div>

				<div className="mainpage-recent-item">
					<img src={image4} className="mainpage-recent-image" />
				</div>
			</div>
		</>
	);
}
