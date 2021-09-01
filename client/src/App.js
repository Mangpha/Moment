import './App.css';
import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../src/components/pages/homepage';
import Header from '../src/components/header/header';
import WriteLog from './components/log/WriteLog';
import Mypage from './components/mypage/Mypage';
import MypageDetail from './components/mypage/MypageDetail';
import MainPage from '../src/components/main-page/mainpage';
import PostCard from '../src/components/post-card/postcard';
import Modal from './components/modal/Modal';
import LogDetail from './components/log/LogDetail';
import MyLogDetail from './components/mylog/MyLogDetail';
import RecentPage from '../src/components/pages/recentpage';
import axios from 'axios';
import MyPostPage from './components/pages/MyPostPage';
import { Context } from './Context';
import { Cookies } from 'react-cookie';

function App() {
	const { isLoginOpen, login } = useContext(Context);
	const cookies = new Cookies();
	useEffect(() => {
		console.log(cookies.get('accessToken'));
	});

	return (
		<div>
			<Header />
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route exact path="/main">
					<MainPage />
				</Route>
				<Route exact path="/log">
					{login && !isLoginOpen ? <WriteLog /> : <Modal />}
				</Route>
				<Route exact path="/myprofile">
					{login && !isLoginOpen ? <Mypage /> : <Modal />}
				</Route>
				<Route path="/fixprofile">{login && !isLoginOpen ? <MypageDetail /> : <Modal />}</Route>
				<Route path="/log/detail">
					<LogDetail />
				</Route>
				<Route path="/log/mydetail">
					<MyLogDetail />
				</Route>
				<Route path="/main/recent">
					<RecentPage />
				</Route>
				<Route path="/myprofile/mypost">
					<MyPostPage />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
