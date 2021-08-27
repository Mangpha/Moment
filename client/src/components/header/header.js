import React, {useState} from 'react';
import { Link } from 'react-router-dom';


import './header.css';
import Login from '../login/Login'
import SignUp from '../signup/SignUp'
export default function Header() {
	const [loginOn, setLoginOn] = useState(false)
	const [signUpON, setSignUpOn] = useState(false)
	const loginModalHandler = () => {
		setLoginOn(!loginOn)
	}
	const signUpModalHandler = () => {
		setSignUpOn(!signUpON)
	}

	return (
		<div className="header">
			{loginOn && <Login loginModalHandler={loginModalHandler} loginOn={loginOn}/>}
			{signUpON && <SignUp signUpModalHandler={signUpModalHandler} signUpON={signUpON}/>}
			<Link className="header-title" to="/">
				<h1>Moment</h1>
			</Link>
			<div className="option">
				<div className="header-login" onClick={loginModalHandler}>Login</div>
				<div className="header-signup" onClick={signUpModalHandler}>Sign Up</div>
			</div>
		</div>
	);
}
