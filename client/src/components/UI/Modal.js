import React from 'react'
import classes from './Modal.module.css';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const BackDrop = ({loginModalHandler, signUpModalHandler, loginOn, signUpON}) => {
    const closeModal = (loginOn, signUpON) => {
        if(loginOn) return loginModalHandler()
        else if(signUpON) return signUpModalHandler()
    }
    return (
        <div onClick={() => closeModal(loginOn, signUpON)} className={classes.backdrop}></div>
    )
}

const ModalOverlay = ({children}) => {
    return(
        <div className={classes.modal}><div className={classes.content}>{children}</div></div>
    )
}


const portalPlace = document.getElementById("overlay")

const Modal = ({children, loginModalHandler, signUpModalHandler, loginOn, signUpON}) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop loginModalHandler={loginModalHandler} signUpModalHandler={signUpModalHandler} loginOn={loginOn} signUpON={signUpON}/>, portalPlace)}
            {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalPlace)}
        </>
    )
}

BackDrop.propTypes = {
    loginModalHandler: PropTypes.any,
    signUpModalHandler: PropTypes.any,
    loginOn: PropTypes.any,
    signUpON: PropTypes.any
}

Modal.propTypes = {
    children: PropTypes.any,
    loginModalHandler: PropTypes.any,
    signUpModalHandler: PropTypes.any,
    loginOn: PropTypes.any,
    signUpON: PropTypes.any
}
ModalOverlay.propTypes = {
    children: PropTypes.any
}

export default Modal