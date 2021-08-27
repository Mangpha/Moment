import React from 'react';
import PropTypes from 'prop-types';

import './recent.css';

const RecentCard = imageUrl => {
	console.log(imageUrl.imageUrl);
	return <img src={imageUrl.imageUrl} />;
};

RecentCard.PropTypes = {
	imageUrl: PropTypes.any,
};

export default RecentCard;
