const { ApolloServer } = require('apollo-server');
const cron = require('node-cron');
const fs = require('fs');

const isRunningFromPackage = fs.existsSync('./data');
require('dotenv').config({
    path: isRunningFromPackage ? '../.env' : '.env'
});

const typeDefs = require('./types/typeDefs');
const resolvers = require('./types/resolvers');

const AccessToken = require('./utils/accessToken');
const getMetaData = require('./utils/getMetaDatas');
const getAllCardBacks = require('./utils/getCardBacks');

async function getToken() {
    await AccessToken.getAccessToken();
}

getToken().then(() => {
    getMetaData.getCardSets();
    getMetaData.getCardClasses();
    getMetaData.getCardRarities();
    getMetaData.getCardTypes();
    getAllCardBacks();
});

const refreshMetaDatas = cron.schedule('* 6 * * *', () => {
    console.log('Cards refreshed', new Date());
    getMetaData.getCardSets();
    getMetaData.getCardClasses();
    getMetaData.getCardRarities();
    getMetaData.getCardTypes();
    getAllCardBacks();
});

refreshMetaDatas.start();

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
