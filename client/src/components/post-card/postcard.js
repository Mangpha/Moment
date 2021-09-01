import React from 'react';

import SideImage from './sideimage';
import Detail from './detail';

import Profile from '../profile/profile-page-demo';

import './postcard.css';

export default function PostCard({ post }) {
	const detailHandler = () => {
		document.location.href = `/log/detail/${post.id}`;
	};
	return (
		<div className="post-card-container" onClick={detailHandler}>
			<Detail post={post} />
			<SideImage />
		</div>
	);
}
