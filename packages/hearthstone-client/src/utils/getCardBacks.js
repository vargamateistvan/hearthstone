const fetch = require('node-fetch');
const fs = require('fs');

const AccessToken = require('./accessToken');
const apiUrl = `https://us.api.blizzard.com/hearthstone/`;

const getAllCardBacks = async () => {
    try {
        await AccessToken.checkToken();
        const pageConfig = {
            pageNumber: 1,
            pageSize: 1000,
            sort: 'name',
            order: 'asc'
        }

        const response = await fetch(`${apiUrl}/cardbacks?locale=en_US&page=${pageConfig.pageNumber}&pageSize=${pageConfig.pageSize}&sort=${pageConfig.sort}&order=${pageConfig.order}&access_token=${AccessToken.getToken()}`, {
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

module.exports = async () => {
    const result = await getAllCardBacks();
    fs.writeFile('./src/data/card_backs.json', JSON.stringify(result.cardBacks), (err) => {
        if (err) return console.error(err);
        console.log('Get card card backs > card_backs.json');
    });
}
