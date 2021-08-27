import React, {useState} from 'react'
import axios from 'axios'
import classes from './Mypage.module.css';
import Card from '../UI/MypageCard'
import {ReactComponent as Book} from '../../assets/book.svg'
import {ReactComponent as Search} from '../../assets/search.svg'
import {ReactComponent as Edit} from '../../assets/edit.svg'
import { Link } from 'react-router-dom';

const Mypage = () => {
    const [userInfo, setUserInfo] = useState({email:'clover@gmail.com', nickname:'clover'})
    axios.get('https://api.m0ment.be/users/profile', {withCredentials: true})
    .then(res => {
        const {data: userInfo} = res
        setUserInfo(userInfo)
    })

    //그냥 내글보기 컴포넌트에서 받아오면 될듯...?
    // const mypostHandler = () => {
    //     axios.post(get("htts://api.m0ment.be/log/mylogs"), {withCredentials: true})
    // }



    const {email, nickname} = userInfo
    return (
        <Card>
            <h2 className={classes.title}>My Profile</h2>
            <div className={classes.container}>
                <img className={classes.pic} src="https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg"></img>
                <div className={classes.text}>
                    <h3>{nickname}</h3>
                </div>
                <div className={classes.text}>
                    <h3>{email}</h3>
                </div>
                <div className={classes.btncontainer}>
                    <Link to="/recent/page/1">
                        <button className={classes.btn}><Book width="34.59" height="34.59"/><br />최신 글</button>
                    </Link>
                    <Link to="/mylogs">
                        <button className={classes.btn}><Search width="34.59" height="34.59"/><br />내 글 보기</button>
                    </Link>
                    <Link to="/fixprofile">
                        <button className={classes.btn}><Edit width="34.59" height="34.59"/><br />정보 수정</button>
                    </Link>
                    {/* <button>Follower</button>
                    <button>Following</button> */}
                </div>  
            </div>
        </Card>
    )
}

export default Mypage
