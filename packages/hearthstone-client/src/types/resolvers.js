const sets = require('../data/sets.json');
const classes = require('../data/classes.json');
const rarities = require('../data/rarities.json');
const types = require('../data/types.json');
const cardBacks = require('../data/card_backs.json');

module.exports = {
    Query: {
        sets: () => sets,
        classes: () => classes,
        rarities: () => rarities,
        cardTypes: () => types,
        cardBacks: () => cardBacks,
        // cardBacks: (actualPage, pageCount) => {
        //     return Array.from(cardBacks).slice(actualPage - 1 * pageCount, pageCount)
        // }
    },
};