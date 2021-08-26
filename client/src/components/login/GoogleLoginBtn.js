// import React from 'react';
// import GoogleLogin from 'react-google-login';

// // const dotenv = require('dotenv');
// // process.env.GOOGLE_CLIENT_ID;''
// const clientId = 'what the'
// // { onSocial }
// export default function GoogleLoginBtn(){
//     const onSuccess = async(response) => {
//     	// console.log(response);
    
//         const { googleId, profileObj : { email, name } } = response;
        
//         await onSocial({
//             socialId : googleId,
//             socialType : 'google',
//             email,
//             nickname : name
//         });
//     }

//     const onFailure = (error) => {
//         // console.log(error);
//     }

//     return(
//         <div>
//             <GoogleLogin
//                 clientId={clientId}
//                 responseType={"id_token"}
//                 onSuccess={onSuccess}
//                 onFailure={onFailure}/>
//         </div>
//     )
// }

