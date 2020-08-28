const { gql } = require('apollo-server');

module.exports = gql`
	type Set {
		collectibleCount: Int
		collectibleRevealedCount: Int
		id: ID
		name: String
		nonCollectibleCount: Int
		nonCollectibleRevealedCount: Int
		releaseDate: String
		slug: String
		type: String
	}

	type Class {
		slug: String
		id: ID
		name: String
		cardId: Int
	}

	type Rarity {
		slug: String
		id: ID
		craftingCost: [Int]
		dustValue: [Int]
		name: String
	}

	type CardType {
		slug: String
		id: ID
		name: String
	}

	type CardBack {
		id: ID,
		sortCategory: Int,
		text: String
		name: String
		image: String
		slug: String
	}

	type Query {
		sets: [Set]
		classes: [Class]
		rarities: [Rarity]
		cardTypes: [CardType]
		cardBacks: [CardBack]
	}
`;