const { ApolloServer } = require('apollo-server');
const fs = require('fs');
require('dotenv').config({
    path: '.env'
});

const metadataCronJobs = require('./src/cron-jobs/metadatas');
const typeDefs = require('./src/types/typeDefs');
const resolvers = require('./src/types/resolvers');

const AccessToken = require('./src/utils/accessToken');
const getMetaData = require('./src/utils/getMetaDatas');
const getAllCardBacks = require('./src/utils/getCardBacks');

async function getToken() {
    await AccessToken.getAccessToken();
}

getToken().then(async () => {
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
    }
    await getMetaData.getCardSets();
    await getMetaData.getCardClasses();
    await getMetaData.getCardRarities();
    await getMetaData.getCardTypes();
    await getAllCardBacks();
}).then(() => {
    const server = new ApolloServer({ typeDefs, resolvers });

    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });

    metadataCronJobs();
});

