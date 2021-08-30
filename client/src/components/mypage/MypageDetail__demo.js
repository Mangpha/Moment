import React, { useState, useContext } from 'react';
import axios from 'axios';
import classes from './MypageDetail.module.css';
import PropTypes from 'prop-types';
import Card from '../UI/MypageCard';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Modal from '../modal/Modal';
import { Context } from '../../Context';

const MypageDetail = () => {
	const { login } = useContext(Context);
	const [userInfo, setUserInfo] = useState({ email: 'clover@gmail.com', nickname: 'clover' });
	const [enteredEmail, setEnteredEmail] = useState('clover@gmail.com');
	const [enteredNickname, setEnteredNickname] = useState('clover');
	const [enteredPassword, setEnteredPassword] = useState('');
	const [passwordIsValid, setPasswordIsValid] = useState(true);
	const [confirmPassword, setConfirmPassword] = useState(true);

	const editHandler = event => {
		event.preventDefault();
		axios
			.post('https://api.m0ment.be/', { email: '', nickname: '', password: '' }, { withCredentials: true })
			.then(res => console.log(res));
	};
	const emailInputHandler = e => {
		setEnteredEmail(e.target.value);
	};
	const nickNameInputHandler = e => {
		setEnteredNickname(e.target.value);
	};
	const passwordInputHandler = e => {
		setEnteredPassword(e.target.value);
	};
	const validatePasswordHandler = e => {
		const reg_pw = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
		if (!reg_pw.test(e.target.value)) setPasswordIsValid(false);
		else setPasswordIsValid(true);
	};
	const confirmPasswordHandler = e => {
		if (enteredPassword === e.target.value) setConfirmPassword(true);
		else setConfirmPassword(false);
	};

	return (
		<>
			{login && <Modal />}
			{!login && (
				<Card className={classes.container}>
					<form className={classes.form} onSubmit={editHandler}>
						<h2 className={classes.title}>My Info</h2>
						<Input
							className={classes.ipt}
							input={{
								type: 'text',
								placeholder: 'E-Mail',
								value: enteredEmail,
								onChange: emailInputHandler,
							}}
						/>
						<Input
							className={classes.ipt}
							input={{
								type: 'text',
								placeholder: 'Nickname',
								value: enteredNickname,
								onChange: nickNameInputHandler,
							}}
						/>
						<Input
							className={passwordIsValid ? `${classes.ipt}` : `${classes.ipt} ${classes.invalid}`}
							input={{
								placeholder: 'Password',
								type: 'password',
								onChange: passwordInputHandler,
								onBlur: validatePasswordHandler,
								value: enteredPassword,
							}}
						/>
						<Input
							className={confirmPassword ? `${classes.ipt}` : `${classes.ipt} ${classes.invalid}`}
							input={{
								type: 'password',
								placeholder: 'Confrim Password',
								onChange: confirmPasswordHandler,
							}}
						/>
						<div className={!confirmPassword ? `${classes.err}` : `${classes.err} ${classes.errNone}`}>
							비밀번호를 확인 해주세요.
						</div>
						<div className={classes.btncontainer}>
							<Button className={classes.btn}>Edit</Button>
						</div>
					</form>
				</Card>
			)}
		</>
	);
};

export default MypageDetail;