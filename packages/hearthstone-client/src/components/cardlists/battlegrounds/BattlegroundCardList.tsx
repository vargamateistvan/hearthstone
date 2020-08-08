import React from 'react';
import { HeartStoneCard, ListConfig } from '../../../types/types';
import { getAllCards } from '../../../utils/getCards';
import HeroesList from './HeroesList';
import TierCardList from './TierCardList';

const pageConfig = {
    pageNumber: 1,
    pageSize: 1000,
    sort: 'name',
    order: 'asc',
    optionalParams: {
        cardClass: 'all',
        cardSet: '',
        gameMode: 'battlegrounds'
    }
}

const BattlegroundCardList: React.FC = () => {
    const [listConfig, setListConfig] = React.useState<ListConfig>(pageConfig);
    const [battlegroundsHeroes, setBattlegroundsHeroes] = React.useState<HeartStoneCard[] | []>([]);
    const [battlegroundsCards, setBattlegroundsCards] = React.useState<HeartStoneCard[] | []>([]);

    const getCards = React.useCallback(async (params) => {
        const result = await getAllCards(params);
        if (result) {
            const heroes = result.cards
                .filter((card: HeartStoneCard) => card.battlegrounds.hero)
                .sort((a: HeartStoneCard, b: HeartStoneCard) => a.name > b.name);
            setBattlegroundsHeroes(heroes);

            const cards = result.cards
                .filter((card: HeartStoneCard) => !card.battlegrounds.hero)
                .sort((a: HeartStoneCard, b: HeartStoneCard) => a.name > b.name)
            setBattlegroundsCards(cards);
        }
    }, []);

    React.useEffect(() => {
        setListConfig(pageConfig);
        getCards(listConfig);
    }, [getCards, listConfig])

    const getTierMinions = (tier: number) => {
        return battlegroundsCards
            .filter((card: HeartStoneCard) => card.battlegrounds.tier === tier)
    }

    return (
        <div>
            <HeroesList
                heroes={battlegroundsHeroes}
            ></HeroesList>

            <TierCardList
                cards={getTierMinions(1)}
                tier={1}
            ></TierCardList>

            <TierCardList
                cards={getTierMinions(2)}
                tier={2}
            ></TierCardList>

            <TierCardList
                cards={getTierMinions(3)}
                tier={3}
            ></TierCardList>

            <TierCardList
                cards={getTierMinions(4)}
                tier={4}
            ></TierCardList>

            <TierCardList
                cards={getTierMinions(5)}
                tier={5}
            ></TierCardList>

            <TierCardList
                cards={getTierMinions(6)}
                tier={6}
            ></TierCardList>
        </div>
    )
}

export default BattlegroundCardList;
