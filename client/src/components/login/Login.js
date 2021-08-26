import React, {useState} from 'react'
import axios from 'axios'

import classes from './Login.module.css'
import Modal from '../UI/Modal'
import Button from '../UI/Button'
import Input from '../UI/Input'
// import GoogleLoginBtn from './GoogleLoginBtn'

const Login = () => {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [emailIsValid, setEmailIsValid] = useState(true)
    const [enteredPassword, setEnteredPassword] = useState('')
    const [passwordIsValid, setPasswordIsValid] = useState(true)
    const [userInfo, setUserInfo] = useState({email:'', nickname:''})

    const emailInputHandler = (e) => {
        setEnteredEmail(e.target.value)
    }
    const passwordInputHandler = (e) => {
        setEnteredPassword(e.target.value)
    }
    const validateEmailHandler = (e) => {
        const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
        if(!reg_email.test(e.target.value)) setEmailIsValid(false)
        else setEmailIsValid(true);
    }
    const validatePasswordHandler = (e) => {
        const reg_pw = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/
        if(!reg_pw.test(e.target.value)) setPasswordIsValid(false);
        else setPasswordIsValid(true);
    }

    const loginHandler = (event) => {
        event.preventDefault();
        axios.post('https://api.m0ment.be/users/login', {email: enteredEmail, password: enteredPassword})
        .then(res => {
            const {data: userData} = res.data;
            setUserInfo(userData);
            //모달창 닫아주는게 필요.
        })
    }

    return (
        <Modal>
            <>
            <form className={classes.form} onSubmit={loginHandler}>
                <div className={classes.title}>
                    <h1>M.</h1>
                <h2>Log in</h2>
                <div>
                    <Input className={emailIsValid ? '' : `${classes.invalid}`} input={{placeholder:"E-mail",  onChange: emailInputHandler, onBlur:validateEmailHandler, value:enteredEmail}}/>
                    {/* <input placeholder="E-mail" className={emailIsValid ? '' : classes.invalid}  onChange={emailInputHandler} onBlur={validateEmailHandler} value={enteredEmail}></input> */}
                </div>
                <div>
                    <Input className={passwordIsValid ? '' : `${classes.invalid}`} input={{placeholder:"Password", type:"password", onChange: passwordInputHandler, onBlur: validatePasswordHandler, value: enteredPassword}} />
                    {/* <input placeholder="Password" className={passwordIsValid ? '' : classes.invalid}  onChange={passwordInputHandler} onBlur={validatePasswordHandler} value={enteredPassword}></input> */}
                </div>
                <div>
                    <Button > Facebook</Button>
                    

                {/* <GoogleLoginBtn/> */}
                </div>
                <Button className={classes.login} btn={{type: "submit"}}> Login</Button>
                </div>
            </form>
            </>
        </Modal>
    )
}

export default Login