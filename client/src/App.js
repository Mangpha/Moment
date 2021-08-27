import './App.css';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';


import HomePage from '../src/components/pages/homepage';
import Header from '../src/components/header/header';
import Login from './components/login/Login';
import Log from './components/log/Log'
import Mypage from './components/mypage/Mypage'
import MypageDetail from './components/mypage/MypageDetail'


function App() {
	return (
		<div>
			<Header />
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route path="/log">
					<Log />
				</Route>
				<Route path="/myprofile">
					<Mypage />
				</Route>
				<Route path="/fixprofile">
					<MypageDetail />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
