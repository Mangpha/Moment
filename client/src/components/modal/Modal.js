import React, { useRef, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import './Modal.css';
import { Context } from '../../Context';
import { Redirect, useHistory } from 'react-router-dom';

const FACEBOOK_ID = process.env.REACT_APP_FACEBOOK_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const Modal = () => {
	const history = useHistory();
	const { loginHandler, getUserInfo, refreshTokenHandler, loginModalHandler, headerModalOpen, headerModalHandler } =
		useContext(Context);
	const modalRef = useRef();
	const [enteredEmail, setEnteredEmail] = useState('');
	const [emailIsValid, setEmailIsValid] = useState(true);
	const [enteredPassword, setEnteredPassword] = useState('');
	const [passwordIsValid, setPasswordIsValid] = useState(true);
	const [formIsValid, setFormIsValid] = useState(false);
	useEffect(() => {
		if (emailIsValid && passwordIsValid && enteredEmail.length > 0 && enteredPassword.length >= 8)
			setFormIsValid(true);
		else setFormIsValid(false);
	});
	const emailInputHandler = e => {
		setEnteredEmail(e.target.value);
	};
	const passwordInputHandler = e => {
		setEnteredPassword(e.target.value);
		validatePasswordHandler(e.target.value);
	};
	const validateEmailHandler = e => {
		const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
		if (!reg_email.test(e.target.value)) setEmailIsValid(false);
		else setEmailIsValid(true);
	};
	const validatePasswordHandler = e => {
		const reg_pw = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
		if (!reg_pw.test(e)) setPasswordIsValid(false);
		else setPasswordIsValid(true);
	};
	const closerModal = e => {
		if (modalRef.current === e.target) {
			if (headerModalOpen) headerModalHandler();
			else loginModalHandler();
		}
	};
	const submitHandler = async () => {
		const res = await axios.post(
			`${ENDPOINT}/users/login`,
			{ email: enteredEmail, password: enteredPassword },
			{ withCredentials: true },
		);
		getUserInfo(res.data.data);
		const refreshToken = JSON.stringify(res.headers.refreshtoken);
		refreshTokenHandler(refreshToken);
		loginHandler();
		if (headerModalOpen) {
			headerModalHandler();
			let path = '/main';
			history.push(path);
			// document.location.href = '/main';
		} else {
			loginModalHandler();
			let path = '/main';
			history.push(path);
			// document.location.href = '/main';
		}
	};
	const FB_URL = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${FACEBOOK_ID}&redirect_uri=${ENDPOINT}/users/facebook&scope=email,public_profile`;
	const Google_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&response_type=code&scope=openid email&redirect_uri=${ENDPOINT}/users/google`;
	const facebookHandler = () => {
		window.location.assign(FB_URL);
		//인증됐는지 여부를 체크하는게 필요...;
		localStorage.setItem('login', true);
	};
	const googleHandler = () => {
		window.location.assign(Google_URL);
		//인증됐는지 여부를 체크하는게 필요...;
		localStorage.setItem('login', true);
	};
	const closeButtonHandler = () => {
		if (headerModalOpen) headerModalHandler();
		else loginModalHandler();
	};

	const portalPlace = document.getElementById('overlay');

	return (
		<>
			{ReactDOM.createPortal(
				<div className="background" ref={modalRef} onClick={closerModal}>
					<div className="modalwrapper">
						<img className="modalimage" src={require('../../assets/svg/17.svg').default} alt="" />
						<div className="modalcontent">
							<h1>M.</h1>
							<span>With us?</span>
							<form className="inputwrapper">
								<input
									className={emailIsValid ? '' : 'invalid'}
									placeholder="E-mail"
									type="text"
									onChange={emailInputHandler}
									onBlur={validateEmailHandler}
									value={enteredEmail}
								></input>
								<input
									className={passwordIsValid ? '' : 'invalid'}
									placeholder="Password"
									type="password"
									onChange={passwordInputHandler}
									value={enteredPassword}
								></input>
							</form>
							<div className="options">
								<button
									className={formIsValid ? 'btn-recent join' : 'btn-recent join invalidbtn'}
									onClick={submitHandler}
								>
									Join
								</button>
								<button className="btn-recent join join-google" onClick={googleHandler}>
									<FontAwesomeIcon icon={faGoogle} />
								</button>

								<button className="btn-recent join join-facebook" onClick={facebookHandler}>
									<FontAwesomeIcon icon={faFacebookF} />
								</button>
							</div>
						</div>
						<div className="modalclosebutton" onClick={closeButtonHandler}>
							&#10005;
						</div>
					</div>
				</div>,
				portalPlace,
			)}
		</>
	);
};

export default Modal;
