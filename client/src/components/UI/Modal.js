import React from 'react'
import classes from './Modal.module.css';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const BackDrop = () => {
    return (
        <div className={classes.backdrop}></div>
    )
}

const ModalOverlay = ({children}) => {
    return(
        <div className={classes.modal}><div className={classes.content}>{children}</div></div>
    )
}


const portalPlace = document.getElementById("overlay")

const Modal = ({children}) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop/>, portalPlace)}
            {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalPlace)}
        </>
    )
}

Modal.propTypes = {
    children: PropTypes.any
}
ModalOverlay.propTypes = {
    children: PropTypes.any
}

export default Modal