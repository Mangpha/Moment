import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TiHeartOutline } from 'react-icons/ti';
import './recent.css';
const RecentCard = ({ id, title, content, nickname, updated }) => {
	const [click, setClick] = useState(false);
	const [count, setCount] = useState(Number(1));
	const clickHandler = () => {
		setClick(!click);
	};

	const time = String(updated);
	const idx = time.indexOf('T');
	const t = time.slice(0, idx);

	const countHandler = () => {
		if (!click) {
			setCount(prevState => prevState + 1);
		} else {
			setCount(prevState => prevState - 1);
		}
		console.log(count);
	};

	const [randomNum, setRandomNum] = useState(1);
	// 랜덤 수
	const getRandomPic = () => {
		let ranNum = Math.floor(Math.random() * 12) + 1;
		setRandomNum(ranNum);
	};

	useEffect(() => {
		getRandomPic();
	}, []);

	const detailHandler = () => {
		document.location.href = `/log/detail/${id}`;
	};

	return (
		<>
			<div className="contains" onClick={detailHandler}>
				<div className="recent-container">
					<div className="recent-image-container">
						<img src={require(`../../static/images/composition-${randomNum}.png`).default} />
					</div>
					<div className="recent-card-container">
						<div className="recent-title">
							<p>{title}</p>
							<span className="recent-card-nickname">{nickname}</span>
							<span className="recent-card-updete">{t}</span>
							<button
								className={click ? `recent-card-liked-click` : 'recent-card-liked'}
								onClick={clickHandler}
							>
								<TiHeartOutline size="15" />
							</button>
						</div>
						<div className="recent-body">
							<p>{content}</p>
						</div>
					</div>
					<div className="recent-btn-container"></div>
				</div>
			</div>
		</>
	);
};

export default RecentCard;
