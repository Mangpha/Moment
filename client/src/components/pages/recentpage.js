import React, { useState, useEffect, useContext } from 'react';
import PostCard from '../post-card/postcard';
import Spinner from '../spinner/spinner';
import axios from 'axios';
import { Context } from '../../Context';

import './recentpage.css';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

export default function RecentPage() {
	const { posts } = useContext(Context);
	const [total, setTotal] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [post, setPost] = useState(posts);
	const [page, setPage] = useState(1);

	// 뒤로 가기
	const prevHandler = () => {
		setPage(prevState => {
			if (prevState === 1) return 1;
			else return prevState - 1;
		});
	};

	// 앞으로 가기
	const nextHandler = () => {
		if (page >= total) return;
		setPage(prevState => prevState + 1);
	};

	// 페이지 바꾸기
	useEffect(() => {
		getPostsHandler();
	}, [page]);

	// 페이지 바꾸는 핸들러
	const getPostsHandler = async () => {
		const res = await axios.get(`${ENDPOINT}/log/recent/page/${page}`);
		setTotal(res.data.data.count);
		const data = res.data.data;
		if (data.length === 0) {
			setPage(prevState => {
				if (prevState === 1) return 1;
				else return prevState - 1;
			});
		}
		setPost([...data.rows]);
	};

	// 스피너
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
				{post.map(post => (
					<div className="recent-main-item" key={post.id}>
						<PostCard key={post.id} post={post} />
					</div>
				))}
				<div className="recent-main-btn-container">
					<button className="recent-main-btn" onClick={prevHandler}>
						PREV
					</button>
					<button className="recent-main-btn" onClick={nextHandler}>
						NEXT
					</button>
				</div>
			</div>
		</>
	);
}
