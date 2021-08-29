import React, { useState, useEffect } from 'react';

import './recentpage.css';

import PostCard from '../post-card/postcard';

import Spinner from '../spinner/spinner';

export default function RecentPage() {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!isLoading) {
			setTimeout(() => {
				setIsLoading(true);
			}, 2000);
		}
	}, [isLoading]);

	if (!isLoading) return <Spinner />;
	return (
		<>
			<div className="recent-main-container">
				{/* 현재 하드 코딩 되어 있음 나중에 데이터 받아 보면 바꿀 것 */}
				<div className="recent-main-item">
					<PostCard />
				</div>
				<div className="recent-main-item">
					<PostCard />
				</div>
				<div className="recent-main-item">
					<PostCard />
				</div>
				<div className="recent-main-item">
					<PostCard />
				</div>
				<div className="recent-main-btn-container">
					<button className="recent-main-btn">PREV</button>
					<button className="recent-main-btn">NEXT</button>
				</div>
			</div>
		</>
	);
}