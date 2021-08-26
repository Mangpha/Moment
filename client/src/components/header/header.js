import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

export default function Header() {
	return (
		<div className="header">
			<Link className="header-title" to="/">
				<h1>Moment</h1>
			</Link>
			<div className="option">
				<div className="header-login">Login</div>
				<div className="header-signup">Sign Up</div>
			</div>
		</div>
	);
}
