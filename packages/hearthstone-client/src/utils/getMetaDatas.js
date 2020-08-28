const fetch = require('node-fetch');
const fs = require('fs');

const AccessToken = require('./accessToken');
const apiUrl = `https://us.api.blizzard.com/hearthstone`;

const getSets = async () => {
    try {
        await AccessToken.checkToken();

        const response = await fetch(`${apiUrl}/metadata/sets?locale=en_US&access_token=${AccessToken.getToken()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + AccessToken.getToken()
            }
        })

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

const getClasses = async () => {
    try {
        await AccessToken.checkToken();

        const response = await fetch(`${apiUrl}/metadata/classes?locale=en_US&access_token=${AccessToken.getToken()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + AccessToken.getToken()
            }
        })

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

const getRarities = async () => {
    try {
        await AccessToken.checkToken();

        const response = await fetch(`${apiUrl}/metadata/rarities?locale=en_US&access_token=${AccessToken.getToken()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + AccessToken.getToken()
            }
        })

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

const getTypes = async () => {
    try {
        await AccessToken.checkToken();

        const response = await fetch(`${apiUrl}/metadata/types?locale=en_US&access_token=${AccessToken.getToken()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + AccessToken.getToken()
            }
        })

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    getCardSets: async () => {
        const result = await getSets();
        fs.writeFile('./src/data/sets.json', JSON.stringify(result), (err) => {
            if (err) return console.error(err);
            console.log('Get card sets > sets.json');
        });
    },
    getCardClasses: async () => {
        const result = await getClasses();
        fs.writeFile('./src/data/classes.json', JSON.stringify(result), (err) => {
            if (err) return console.error(err);
            console.log('Get card classes > classes.json');
        });
    },
    getCardRarities: async () => {
        const result = await getRarities();
        fs.writeFile('./src/data/rarities.json', JSON.stringify(result), (err) => {
            if (err) return console.error(err);
            console.log('Get card rarities > rarities.json');
        });
    },
    getCardTypes: async () => {
        const result = await getTypes();
        fs.writeFile('./src/data/types.json', JSON.stringify(result), (err) => {
            if (err) return console.error(err);
            console.log('Get card types > types.json');
        });
    }
}
