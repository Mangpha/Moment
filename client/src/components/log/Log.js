import React, {useState} from 'react'
import axios from 'axios'
import Card from '../UI/Card'
import Input from '../UI/Input'
import Button from '../UI/Button'
import classes from './Log.module.css'

const Log = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const titleHandler = (e) => {
        setTitle(e.target.value)
        console.log(title)
    }
    const contentHandler = (e) => {
        setContent(e.target.value)
    }
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post("https://api.m0ment.be/log/submit", {conetent: content, title: title}, {withCredentials: true})
        .then(res => console.log(res))
    }


    return (
        <Card>
            <form className={classes.formContainer} onSubmit={submitHandler}>
                <div className={classes.container}>
                    <Input className={classes.cardInput} input={{type: "text", placeholder: "title", onChange:titleHandler}} />
                    <textarea className={classes.textarea} placeholder="Remember your moment in Moments forever." onChange={contentHandler} />
                </div>
                <div className={classes.btnContainer}>
                    <Button className={classes.writebtn} btn={{type: "submit"}}>POST</Button>
                </div>
            </form>
        </Card>
    )
}

export default Log
