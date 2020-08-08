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

interface BattleGrounds {
    tier: number;
    image: string;
    imageGold: string;
    hero: boolean;
    upgradeId: number;
}

export interface ListConfig {
    pageNumber: number;
    pageSize: number;
    sort: string;
    order: string;
    optionalParams: OptionalParams;
}

export interface OptionalParams {
    cardClass: string;
    cardSet: string;
    gameMode: string;
}

export interface CardListProps {
    cardSet: string;
    gameMode: string;
}

export interface BattleGroundsCardListProps {
    heroes: HeartStoneCard[];
    cards: HeartStoneCard[];
}

export interface HeroesListProps {
    heroes: HeartStoneCard[];
}

export interface TierCardListProps {
    cards: HeartStoneCard[];
    tier: number;
}

export interface HeartStoneCardProps {
    card: HeartStoneCard;
    showGoldsOnly?: boolean;
    isBattleGrounds?: boolean
}