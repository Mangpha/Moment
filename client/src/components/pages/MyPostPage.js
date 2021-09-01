import React, { useState, useEffect } from 'react';
import './MyPostPage.module.css';
import PostCard from '../my-post-card/postcard';
import Spinner from '../spinner/spinner';
import axios from 'axios';
import classes from './MyPostPage.module.css';
import { useLocation } from 'react-router-dom';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

export default function MyPostPage() {
	const [total, setTotal] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [pages, setPages] = useState(1);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		console.log('page clicked');
		getPostsHandler();
	}, [pages]);

	const prevHandler = () => {
		setPages(prevState => {
			if (prevState === 1) return 1;
			return prevState - 1;
		});
	};
	const nextHandler = () => {
		if (pages >= total) return;
		setPages(prevState => prevState + 1);
	};
	const getPostsHandler = async () => {
		const res = await axios.get(`${ENDPOINT}/log/myPost/${pages}`, { withCredentials: true });
		setTotal(res.data.data.count);

		if (res.data.data.rows.length === 0) {
			setPages(prevState => {
				if (prevState === 1) return 1;
				return prevState - 1;
			});
		}
		setPosts([...res.data.data.rows]);
		console.log(posts);
	};

	// if (!isLoading) return <Spinner />;
	return (
		<>
			<div className="recent-main-container">
				{posts.map(post => (
					<div className="recent-main-item" key={post.id}>
						<PostCard key={post.id} post={post} pages={pages} />
					</div>
				))}
				<div className={classes.btnContainer}>
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
