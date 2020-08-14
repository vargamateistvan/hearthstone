const base64 = require('base-64');

const apiUrl = `https://us.api.blizzard.com/hearthstone/`;
let accessToken;
let tokenExpirationTime;
let requestedTokenTime;

export const getAccessToken = async () => {
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

// const checkToken = async () => {
//     if (!accessToken) return await getAccessToken();

//     const expiredTime = new Date(requestedTokenTime + tokenExpirationTime).getTime();
//     const now = new Date().getTime();

//     if (expiredTime < now) {
//         await getAccessToken();
//     }
// }

const isTokenInVaild = () => {
    if (!accessToken) return true;

    const expiredTime = new Date(requestedTokenTime + tokenExpirationTime).getTime();
    const now = new Date().getTime();

    return expiredTime < now;
}

export const getAllCards = async ({ pageNumber = null, pageSize = null, sort = null, order = null, optionalParams = { class: null, set: null, gameMode: null, rarity: null, type: null } }) => {
    if (isTokenInVaild()) {
        await getAccessToken();
    }

    let url = `${apiUrl}/cards?locale=en_US&access_token=${accessToken}`;

    if (pageNumber) {
        url += `&page=${pageNumber}`
    }

    if (pageSize) {
        url += `&pageSize=${pageSize}`
    }

    if (sort) {
        url += `&sort=${sort}`
    }

    if (order) {
        url += `&order=${order}`
    }

    if (optionalParams.class) {
        url += `&class=${optionalParams.class}`;
    }

    if (optionalParams.set) {
        url += `&set=${optionalParams.set}`;
    }

    if (optionalParams.gameMode) {
        url += `&gameMode=${optionalParams.gameMode}`;
    }

    if (optionalParams.rarity) {
        url += `&rarity=${optionalParams.rarity}`;
    }

    if (optionalParams.type) {
        url += `&type=${optionalParams.type}`;
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
    if (isTokenInVaild()) {
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

export const getAllCardBacks = async () => {
    if (isTokenInVaild()) {
        await getAccessToken();
    }

    const pageConfig = {
        pageNumber: 1,
        pageSize: 1000,
        sort: 'name',
        order: 'asc'
    }

    const response = await fetch(`${apiUrl}/cardbacks?locale=en_US&page=${pageConfig.pageNumber}&pageSize=${pageConfig.pageSize}&sort=${pageConfig.sort}&order=${pageConfig.order}&access_token=${accessToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    return await response.json();
}

export const getSets = async () => {
    if (isTokenInVaild()) {
        await getAccessToken();
    }

    const response = await fetch(`${apiUrl}/metadata/sets?locale=en_US&access_token=${accessToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    return await response.json();
}

export const getClasses = async () => {
    if (isTokenInVaild()) {
        await getAccessToken();
    }

    const response = await fetch(`${apiUrl}/metadata/classes?locale=en_US&access_token=${accessToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    return await response.json();
}

export const getGameModes = async () => {
    if (isTokenInVaild()) {
        await getAccessToken();
    }

    const response = await fetch(`${apiUrl}/metadata/gameModes?locale=en_US&access_token=${accessToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    return await response.json();
}

export const getRarities = async () => {
    if (isTokenInVaild()) {
        await getAccessToken();
    }

    const response = await fetch(`${apiUrl}/metadata/rarities?locale=en_US&access_token=${accessToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    return await response.json();
}

export const getTypes = async () => {
    if (isTokenInVaild()) {
        await getAccessToken();
    }

    const response = await fetch(`${apiUrl}/metadata/types?locale=en_US&access_token=${accessToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    return await response.json();
}

export const getHeroes = async () => {
    if (isTokenInVaild()) {
        await getAccessToken();
    }

    const response = await fetch(`${apiUrl}/cards?locale=en_US&type=hero&pageSize=1000&sort=name&order=desc&access_token=${accessToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    return await response.json();
}


export const getDeck = async (deckCode) => {
    if (isTokenInVaild()) {
        await getAccessToken();
    }

    const response = await fetch(`${apiUrl}/deck/${deckCode}?locale=en_US&type=hero&pageSize=1000&sort=name&order=desc&access_token=${accessToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    return await response.json();
}
