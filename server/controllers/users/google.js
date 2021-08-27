const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const axios = require('axios');
const { Users } = require('../../models');

module.exportes = async (req, res) => {
  await axios.post('https://accounts.google.com/o/oauth2/v2/auth', {
    client_id: clientID,
    client_secret: clientSecret,
    redirect_uri: 'https://localhost:3000',
    code: req.body.authorizationCode,
    response_type: 'token',
    // scope: 
  })
    .then(async ressult => {
      let accessToken = result.data.access_token;
      let refreshToken = result.data.refresh_token;
      const userEmail = await axios.get('', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
        .then(result => result.data.email);

      const userInfo = await Users.findOne({
        where: { email: userEmail }
      });
      // if(userInfo === un)
    })

}