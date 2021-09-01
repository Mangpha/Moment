import React from 'react';

import SideImage from './sideimage';
import Detail from '../my-post-card/detail';
import { useHistory } from 'react-router-dom';
import Profile from '../profile/profile-page-demo';

import './postcard.css';

export default function PostCard({ post, pages }) {
	const history = useHistory();
	const detailHandler = () => {
		let path = `/log/mydetail/${post.id}`;
		history.push({ pathname: path, state: { pages: pages } });
		// document.location.href = `/log/mydetail/${post.id}`;
	};
	return (
		<div className="post-card-container" onClick={detailHandler}>
			<Detail post={post} />
			<SideImage />
		</div>
	);
}
