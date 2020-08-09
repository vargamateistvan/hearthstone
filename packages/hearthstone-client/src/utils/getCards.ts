const base64 = require('base-64');

const apiUrl = `https://us.api.blizzard.com/hearthstone/`;
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

const isTokenVaild = () => {
    if (!accessToken) return true;

    const expiredTime = new Date(requestedTokenTime + tokenExpirationTime).getTime();
    const now = new Date().getTime();

    return expiredTime < now
}

export const getAllCards = async ({ pageNumber, pageSize, sort, order, optionalParams = { cardClass: null, cardSet: null, gameMode: null } }) => {
    if (isTokenVaild()) {
        await getAccessToken();
    }

    let url = `${apiUrl}/cards?locale=en_US&page=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}&access_token=${accessToken}`;
    if (optionalParams.cardClass) {
        url += `&class=${optionalParams.cardClass}`;
    }

    if (optionalParams.cardSet) {
        url += `&set=${optionalParams.cardSet}`;
    }

    if (optionalParams.gameMode) {
        url += `&gameMode=${optionalParams.gameMode}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    return await response.json();
}

export const getCard = async (idorslug) => {
    if (isTokenVaild()) {
        await getAccessToken();
    }

    const response = await fetch(`${apiUrl}/cards?locale=en_US&textFilter=${idorslug}&access_token=${accessToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    return await response.json();
}