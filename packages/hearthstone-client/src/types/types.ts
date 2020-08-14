export interface Cards {
    cardCount: number;
    cards: HeartStoneCard[];
    page: number;
    pageCount: number;
}

export interface HeartStoneCard {
    artistName: string;
    attack: number;
    cardSetId: number;
    cardTypeId: number;
    classId: number;
    collectible: number;
    cropImage: string;
    flavorText: string;
    health: number;
    id: number;
    image: string;
    imageGold: string;
    keywordIds: number[];
    manaCost: number;
    minionTypeId: number;
    multiClassIds: number[];
    name: string;
    rarityId: number;
    slug: string;
    text: string;
    battlegrounds: BattleGrounds;
}
export interface CardBack {
    cardCount: number;
    cardBacks: CardBackCard[];
    page: number;
    pageCount: number;
}

export interface CardBackCard {
    id: number;
    sortCategory: number;
    text: string;
    name: string;
    image: string;
    slug: string;
}

interface BattleGrounds {
    tier: number;
    image: string;
    imageGold: string;
    hero: boolean;
    upgradeId: number;
}

export interface ListConfig {
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
    order?: string;
    optionalParams?: OptionalParams;
}

export interface OptionalParams {
    class?: string;
    set?: string;
    gameMode?: string;
    rarity?: string;
    type?: string;
}

export interface CardListProps {
    cardSet: string;
    gameMode: string;
}

export interface CardSet {
    id: number;
    name: string;
    slug: string;
    releaseDate: string;
    type: string;
    collectibleCount: number;
    collectibleRevealedCount: number;
    nonCollectibleCount: number;
    nonCollectibleRevealedCount: number;
}

export interface CardClass {
    slug: string;
    id: number;
    name: string;
    cardId?: number;
}

export interface GameMode {
    slug: string;
    id: number;
    name: string;
}

export interface CardRarity {
    slug: string,
    id: number,
    craftingCost: number[],
    dustValue: number[],
    name: string;
}

export interface CardType {
    slug: string;
    id: number;
    name: string;
}