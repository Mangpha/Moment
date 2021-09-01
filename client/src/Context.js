import React, { useState, useEffect, useRef, useReducer } from 'react';
import axios from 'axios';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const Context = React.createContext({
	login: '',
	loginHandler: () => {},
	userInfo: '',
});
const defaultUInfo = {
	email: '',
	nickname: '',
	avatar: '',
};
const userInfoReducer = (state, action) => {
	if (action.type === 'GET') {
		console.log(action.item);
		return { email: action.item.email, nickname: action.item.nickname, avatar: action.item.avatar };
	}
};

const ContextProvider = ({ children }) => {
	//login, signup
	const [uInfo, dispatchUInfo] = useReducer(userInfoReducer, defaultUInfo);
	const [headerModalOpen, setHeaderModalOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isSignupOpen, setIsSignupOpen] = useState(false);
	const [userInfo, setUserInfo] = useState('');
	const [login, setLogin] = useState(false);
	const [refreshToken, setRefreshToken] = useState('');
	const headerModalHandler = () => {
		setHeaderModalOpen(!headerModalOpen);
	};
	const loginModalHandler = () => {
		setIsLoginOpen(!isLoginOpen);
		console.log(isLoginOpen);
	};
	const signUpModalHandler = () => {
		setIsSignupOpen(!isSignupOpen);
	};
	const getUserInfo = data => {
		dispatchUInfo({ type: 'GET', item: data });
		// setUserInfo(data);
		// console.log('userInfo at App :', data);
	};
	const loginHandler = () => {
		// 마이프로필에 요청, 데이터가 없으면 로그인안된거, 데이터가 있으면,
		// console.log(1);
		// const res = await axios.get('https://api.m0ment.be/users/profile', { withCredentials: true });
		// console.log(res);
		// if (res.data) {
		localStorage.setItem('login', true);
		setLogin(true);
		console.log(localStorage.getItem('login'));
		// }
	};
	const refreshTokenHandler = token => {
		setRefreshToken(token);
	};
	const local = localStorage.getItem('login');
	useEffect(() => {
		if (local) setLogin(true);
		else setLogin(false);
	}, [local]);
	const logoutHandler = async () => {
		let header = { refreshToken: `${refreshToken}` };
		const response = await axios.get(`${ENDPOINT}/users/logout`, {
			withCredentials: true,
			headers: header,
		});
		console.log(response);
		localStorage.removeItem('login');
		setLogin(false);
		document.location.href = './';
	};

	//recent
	const [posts, setPosts] = useState('');
	useEffect(async () => {
		const res = await axios.get(`${ENDPOINT}/log/recent/page/1`);
		const logs = res.data.data.rows;
		setPosts([...logs]);
	}, []);
	console.log(posts);
	return (
		<Context.Provider
			value={{
				isLoginOpen,
				isSignupOpen,
				loginHandler,
				getUserInfo,
				refreshTokenHandler,
				loginModalHandler,
				login,
				signUpModalHandler,
				logoutHandler,
				posts,
				headerModalOpen,
				headerModalHandler,
				userInfo,
				uInfo,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export { ContextProvider, Context };
