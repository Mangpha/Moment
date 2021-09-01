import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecentCard from '../recent-card/recent';
import Spinner from '../spinner/spinner';
import './mainpage.css';
import { Context } from '../../Context';
import { Cookies, useCookies } from 'react-cookie';

export default function MainPage() {
	const { posts } = useContext(Context);

	const [isLoading, setIsLoading] = useState(false);

	const END_POINT = process.env.REACT_APP_ENDPOINT;
	const cookies = new Cookies();
	const [cookie, setCookie, removeCookie] = useCookies(['accessToken']);

	useEffect(() => {
		if (!isLoading) {
			const url = new URL(window.location.href);
			const oauth = url.searchParams.get('oauth');
			if (oauth) {
				setCookie('accessToken', oauth, { sameSite: 'none', secure: true, httpOnly: true });
			}
			setTimeout(() => {
				setIsLoading(true);
			}, 2000);
		}
	}, [isLoading]);

	if (!isLoading) return <Spinner />;

	return (
		<>
			<div className="mainpage">
				<a href="/log">
					<div className="mainpage-btn"></div>
				</a>
			</div>
			<div className="mainpage-recent-container">
				{posts.map(post => (
					<RecentCard
						key={post.id}
						id={post.id}
						title={post.title}
						content={post.content}
						nickname={post.User.nickname}
						updated={post.updatedAt}
					/>
				))}
			</div>

			<div className="mainpage-recent-btn-container">
				<Link to="/main/recent">
					<button className="recent-btn">View more</button>
				</Link>
			</div>
		</>
	);
}
