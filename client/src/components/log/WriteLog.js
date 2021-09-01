import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './WriteLog.module.css';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const WriteLog = () => {
	const [nickname, setNickname] = useState('');
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [secret, setSecret] = useState(false);
	useEffect(() => {
		getUsername();
	}, []);

	const titleHandler = e => {
		setTitle(e.target.value);
		console.log(title);
	};
	const contentHandler = e => {
		setContent(e.target.value);
	};
	const secretHandler = e => {
		setSecret(e.currentTarget.checked);
		console.log(secret);
	};
	const submitHandler = async event => {
		event.preventDefault();
		const res = await axios.put(`${ENDPOINT}/log/submit`, { content, title, secret }, { withCredentials: true });
		console.log(res);
		document.location.href = './main/recent';
	};
	const getUsername = async () => {
		const user = await axios.get(`${ENDPOINT}/users/profile`, { withCredentials: true });
		const { nickname } = user.data.data;
		setNickname(nickname);
	};

	return (
		<>
			<div className={classes.contains}>
				<div className={classes.header}>
					<h2>Make your Moment Forever</h2>
				</div>
				<form className={classes.formContainer} onSubmit={submitHandler}>
					<div className={classes.container}>
						<div className={classes.titleContainer}>
							<h4>Title</h4>
							<input
								className={classes.title}
								type="text"
								placeholder="write down a title"
								onChange={titleHandler}
							/>
						</div>
						<div className={classes.author}>
							<div>
								<span>author: </span>
								<span>{nickname}</span>
							</div>
						</div>
						<div className={classes['content__container']}>
							<h4>Content</h4>
							<textarea
								className={classes.content}
								placeholder="Make your Moment forever."
								onChange={contentHandler}
							/>
							<div className={classes.grip}></div>
						</div>
					</div>
					<div className={classes.secret}>
						<input
							className={classes.lock}
							type="checkbox"
							id="secret"
							name="secret"
							checked={secret ? true : false}
							value={secret}
							onChange={secretHandler}
						/>
						<label id="secret" htmlFor="secret">
							{!secret && (
								<div className={classes.lockContainer}>
									<AiFillUnlock size="24" />
									<span className={classes.lockImg}>Keep Your Precious Moment to Yourself</span>
								</div>
							)}
							{secret && (
								<div className={classes.lockContainer}>
									<AiFillLock size="24" />
									<span className={classes.unlockImg}>Share your Moment with Others</span>
								</div>
							)}
						</label>
					</div>
					<div className={classes.btnContainer}>
						<button className={classes.btn} type="submit">
							<h4>POST</h4>
						</button>
					</div>
				</form>
			</div>
			){/* } */}
		</>
	);
};

export default WriteLog;
