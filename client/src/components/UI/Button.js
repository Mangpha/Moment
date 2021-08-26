import React from 'react'
import PropTypes from 'prop-types'
import classes from './Button.module.css'

const Button = ({children, btn, className}) => {
    return (
        <button className={`${classes.button} ${className}`} {...btn}>
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.any,
    btn: PropTypes.any,
    className: PropTypes.any
}

export default Button