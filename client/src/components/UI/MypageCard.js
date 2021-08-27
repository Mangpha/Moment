import React from 'react'
import PropTypes from 'prop-types'
import classes from './MypageCard.module.css'

const MypageCard = ({children}) => {
    return (
        <div className={classes.card}>
            {children}
        </div>
    )
}

MypageCard.propTypes = {
    children: PropTypes.any
}


export default MypageCard
