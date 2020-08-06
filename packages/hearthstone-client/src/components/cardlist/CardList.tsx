import React from 'react';
import { List, Modal, Pagination, Input } from 'antd';

import { getAllCards, getCard } from '../../utils/getCards';
import { Cards, HeartStoneCard } from '../../types';
import ViewCardModal from './CardModal';

const { Search } = Input;

const pageConfig = {
    pageNumber: 1,
    pageSize: 16,
    sort: 'name',
    order: 'desc'
}

const CardList: React.FC = () => {
    const [cards, setCards] = React.useState<Cards | null>(null);
    const [showCard, setShowCard] = React.useState<boolean>(false);
    const [currentCard, setCurrentCard] = React.useState<HeartStoneCard | null>(null);

    const getCards = React.useCallback(async (params) => {
        const result = await getAllCards(params);
        if (result) {
            setCards(result);
        }
    }, [])

    React.useEffect(() => {
        getCards(pageConfig)
    }, [])

    const onChange = (page: number) => {
        pageConfig.pageNumber = page;
        getCards(pageConfig)
    }

    const onShowSizeChange = (size: number) => {
        pageConfig.pageSize = size;
        getCards(pageConfig)
    }

    const onSearch = (query: string) => {
        getCard(query);
    }

    const onShowCard = (card: HeartStoneCard) => {
        setCurrentCard(card)
        setShowCard(true);
    }

    return (
        cards ?
            <div>
                <Search
                    placeholder="Enter a card name"
                    onSearch={onSearch}
                    size="large"
                ></Search>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    size="large"
                    dataSource={cards.cards}
                    renderItem={(card: HeartStoneCard) => (
                        <List.Item
                            key={card.id}
                            onClick={() => onShowCard(card)}
                        >
                            <img src={card.image} />
                        </List.Item>
                    )}
                />
                <Pagination
                    defaultCurrent={pageConfig.pageNumber}
                    total={cards.cardCount}
                    onChange={onChange}
                    onShowSizeChange={onShowSizeChange}
                />
                {currentCard ?
                    <Modal
                        visible={showCard}
                        centered
                        onOk={() => setShowCard(false)}
                        onCancel={() => setShowCard(false)}
                    >
                        <ViewCardModal
                            artistName={currentCard.artistName}
                            attack={currentCard.attack}
                            cardSetId={currentCard.cardSetId}
                            cardTypeId={currentCard.cardTypeId}
                            classId={currentCard.classId}
                            collectible={currentCard.collectible}
                            cropImage={currentCard.cropImage}
                            flavorText={currentCard.flavorText}
                            health={currentCard.health}
                            id={currentCard.id}
                            image={currentCard.image}
                            imageGold={currentCard.imageGold}
                            keywordIds={currentCard.keywordIds}
                            manaCost={currentCard.manaCost}
                            minionTypeId={currentCard.minionTypeId}
                            multiClassIds={currentCard.multiClassIds}
                            name={currentCard.name}
                            rarityId={currentCard.rarityId}
                            slug={currentCard.slug}
                            text={currentCard.text}
                        ></ViewCardModal>
                    </Modal> : null}
            </div>
            : null
    );
}

export default CardList;
