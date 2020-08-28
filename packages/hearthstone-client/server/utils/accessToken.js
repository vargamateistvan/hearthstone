const fetch = require('node-fetch');
const base64 = require('base-64');

let accessToken;
let tokenExpirationTime;
let requestedTokenTime;

const getAccessToken = async () => {
    const response = await fetch(`https://us.battle.net/oauth/token`, {
        body: "grant_type=client_credentials",
        headers: {
            Authorization: 'Basic ' + base64.encode(process.env.REACT_APP_BNET_ID + ':' + process.env.REACT_APP_BNET_SECRET),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    })

    const result = await response.json();
    accessToken = result.access_token;
    tokenExpirationTime = result.expires_in;
    requestedTokenTime = new Date().getTime();
}

const isTokenInVaild = () => {
    if (!accessToken) return true;

    const expiredTime = new Date(requestedTokenTime + tokenExpirationTime).getTime();
    const now = new Date().getTime();

    return expiredTime < now;
}

const checkToken = async () => {
    if (!accessToken) return await getAccessToken();
    const expiredTime = new Date(requestedTokenTime + tokenExpirationTime).getTime();
    const now = new Date().getTime();

    if (expiredTime < now) {
        await getAccessToken();
    }
}

const getToken = () => {
    return accessToken
}

module.exports = {
    getToken,
    getAccessToken,
    isTokenInVaild,
    checkToken
}