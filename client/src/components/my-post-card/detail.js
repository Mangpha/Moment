import React, { useState, useEffect } from 'react';
import { TiHeartOutline } from 'react-icons/ti';
import axios from 'axios';
import './detail.css';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

export default function Detail({ post }) {
	const [click, setClick] = useState(false);
	const [count, setCount] = useState(post.like_count);
	let test = 1;
	// 중복클릭 방지
	// 1.
	// const func = () => {
	// if(disabled) alert('작동중')
	// else {
	// 		disabled = true
	// 		ToDo();
	// 		disabled = false
	//  } }
	// 2.
	// const func = () => {
	// 	count--;
	// 	if (count <= 0) 실행중;
	// 	else ToDo();

	// 	count++;
	// };

	useEffect(() => {
		// console.log(post['like_count']);
		getPostsHandler();
		likeCheckHandler();
	}, []);

	const countHandler = async event => {
		event.stopPropagation();
		// likeCheckHandler();
		if (test <= 0) test++;
		else {
			test--;
			const res = await axios.get(`${ENDPOINT}/log/like/${post.id}`, { withCredentials: true });
			if (res) {
				if (!click) {
					setClick(!click);
					setCount(prevState => prevState + 1);
				} else if (click) {
					setClick(!click);
					setCount(prevState => {
						if (prevState >= 1) return prevState - 1;
						else return prevState;
					});
				}
			}
			test++;
		}
	};

	const likeCheckHandler = async () => {
		// console.log(post['like_count']);
		// setCount(post['like_count']);
		const res = await axios.get(`${ENDPOINT}/log/userIsLike/${post.id}`, { withCredentials: true });
		//이미 좋아요를 눌렀던 상태라면, 클릭된상태라고 저장하고, 핑크색으로 바뀌게.
		console.log(res.data.userLikePost);
		if (res.data.userLikePost) setClick(res.data.userLikePost);
		// console.log(res.data.userLikePost);
	};

	const getPostsHandler = async () => {
		const res = await axios.get(`${ENDPOINT}/log/detail/${post.id}`);
		console.log(post.id, res);
		setCount(res.data.data.like_count);
	};
	return (
		<>
			<div className="details-container">
				<div className="details-inner-container">
					<h1 className="details-header">{post.title}</h1>
					<span className="sub details-subheader">
						{post.User.nickname}
						<br />
						{post.updated}
					</span>
					<p className="details-text">{post.content}</p>
					<div className="details-options">
						<button
							className={click ? `recent-card-liked-click` : 'recent-card-liked'}
							onClick={countHandler}
						>
							<TiHeartOutline size="18" />
						</button>
					</div>
					<span className="detail-count">Like: {count}</span>
				</div>
			</div>
		</>
	);
}
