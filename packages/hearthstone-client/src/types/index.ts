export interface Cards {
    cardCount: number;
    cards: Card[];
    page: number;
    pageCount: number;
}

export interface Card {
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
}