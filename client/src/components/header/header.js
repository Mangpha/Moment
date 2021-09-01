import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import ModalSignUp from '../modal/ModalSignUp';
import Modal from '../modal/Modal';
import { Context } from '../../Context';
export default function Header() {
	const { login, isSignupOpen, signUpModalHandler, logoutHandler, headerModalOpen, headerModalHandler } =
		useContext(Context);

	return (
		<div className="header">
			{headerModalOpen && <Modal />}
			{isSignupOpen && <ModalSignUp />}
			<Link className="header-title" to="/">
				<h1>Moment</h1>
			</Link>
			{!login && (
				<div className="option">
					<div className="header-login" onClick={headerModalHandler}>
						Login
					</div>
					<div className="header-signup" onClick={signUpModalHandler}>
						Sign Up
					</div>
				</div>
			)}
			{login && (
				<div className="option">
					<Link to="/myprofile">
						<div className="header-login">My Page</div>
					</Link>
					<div className="header-signup" onClick={logoutHandler}>
						Sign Out
					</div>
				</div>
			)}
		</div>
	);
}
