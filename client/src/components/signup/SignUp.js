import React, {useState} from 'react'
import axios from 'axios'
import Modal from '../UI/Modal'
import classes from './SignUp.module.css'
import PropTypes from 'prop-types'
import Input from '../UI/Input'
import Button from '../UI/Button'
const SignUp = ({signUpModalHandler, signUpON}) => {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [emailIsValid, setEmailIsValid] = useState(true)
    const [enteredPassword, setEnteredPassword] = useState('')
    const [passwordIsValid, setPasswordIsValid] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState(true)
    const [enteredNickname, setEnteredNickname] = useState('')
    const [nicknameIsValid, setNicknameIsValid] = useState(true)

    const emailInputHandler = (e) => {
        setEnteredEmail(e.target.value)
    }
    const passwordInputHandler = (e) => {
        setEnteredPassword(e.target.value)
        validatePasswordHandler(e.target.value)
    }
    const validateEmailHandler = (e) => {
        const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
        if(!reg_email.test(e.target.value)) setEmailIsValid(false)
        else setEmailIsValid(true);
    }
    const validatePasswordHandler = (e) => {
        const reg_pw = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/
        if(!reg_pw.test(e)) setPasswordIsValid(false);
        else setPasswordIsValid(true);
    }
    const confirmPasswordHandler = (e) => {
        if(enteredPassword === e.target.value) setConfirmPassword(true)
        else setConfirmPassword(false)
    }
    const nickNameInputHandler = (e) => {
        setEnteredNickname(e.target.value)
        validateNickNameHandler(e.target.value)
    }
    const validateNickNameHandler = (e) => {
        const reg_NN = /^.*(?=.{3,20})(?=.*[a-zA-Z0-9]).*$/
        if(!reg_NN.test(e)) setNicknameIsValid(false);
        else setNicknameIsValid(true);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        axios.put('https://api.m0ment.be/users/signup', {email: enteredEmail, password: enteredPassword, nickname: setEnteredNickname})
        .then(res => {
            signUpModalHandler()
            //로그인 상태 수정이 필요할듯...?
            //모달창 닫아주는게 필요.
        })
    }


    return (
        <Modal signUpModalHandler={signUpModalHandler}  signUpON={signUpON}>
            <div>
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.title}>
                <h1>M.</h1>
                <h2>Sign Up</h2>
            </div>
                <Input className={emailIsValid ? '' : `${classes.invalid}`} input={{placeholder:"E-mail", type:"text",  onChange: emailInputHandler, onBlur:validateEmailHandler, value:enteredEmail}}/>
                <Input className={passwordIsValid ? '' : `${classes.invalid}`} input={{placeholder:"Password", type:"password", onChange: passwordInputHandler, value: enteredPassword}} />
                <Input className={confirmPassword ? '' : `${classes.invalid}`} input={{placeholder:"Confirm Password ", type:"password", onChange: confirmPasswordHandler}} />
                <Input className={nicknameIsValid ? '' : `${classes.invalid}`} input={{placeholder:"Nickname", type:"text", onChange: nickNameInputHandler, value: enteredNickname}} />
                <Button className={classes.signup} btn={{type:"submit"}}>Sign Up</Button>
        </form>
        </div>
    </Modal>
    )
}

SignUp.propTypes = {
    signUpModalHandler: PropTypes.any,
    signUpON: PropTypes.any
}
export default SignUp