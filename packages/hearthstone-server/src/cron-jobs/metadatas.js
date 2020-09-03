const cron = require('node-cron');

const getMetaData = require('../utils/getMetaDatas');
const getAllCardBacks = require('../utils/getCardBacks');

const refreshMetaDatas = cron.schedule('* * 6 * * *', async () => {
    console.log('Cards refreshed', new Date());
    await getMetaData.getCardSets();
    await getMetaData.getCardClasses();
    await getMetaData.getCardRarities();
    await getMetaData.getCardTypes();
    await getAllCardBacks();
});

module.exports = () => {
    console.log('MetaData cron-job started.', new Date())
    refreshMetaDatas.start();
}