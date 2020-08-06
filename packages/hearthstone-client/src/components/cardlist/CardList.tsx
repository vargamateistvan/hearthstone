import React from 'react';
import { List, Modal, Pagination, Input, Select, Typography } from 'antd';

import { getAllCards, getCard } from '../../utils/getCards';
import { Cards, HeartStoneCard, OptionalParams, ListConfig } from '../../types';
import ViewCardModal from './CardModal';

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;


const pageConfig = {
    pageNumber: 1,
    pageSize: 16,
    sort: 'name',
    order: 'asc',
    optionalParams: {
        cardClass: 'all',
        cardSet: ''
    }
}

const CardList: React.FC<OptionalParams> = ({ cardClass, cardSet }) => {
    const [listConfig, setListConfig] = React.useState<ListConfig>(pageConfig);
    const [cards, setCards] = React.useState<Cards | null>(null);
    const [showCard, setShowCard] = React.useState<boolean>(false);
    const [currentCard, setCurrentCard] = React.useState<HeartStoneCard | null>(null);

    const getCards = React.useCallback(async (params) => {
        const result = await getAllCards(params);
        if (result) {
            setCards(result);
        }
    }, []);

    if (cardClass !== pageConfig.optionalParams.cardClass || cardSet !== pageConfig.optionalParams.cardSet) {
        pageConfig.optionalParams.cardClass = cardClass;
        pageConfig.optionalParams.cardSet = cardSet;
        setListConfig(pageConfig);
        getCards(listConfig);
    }

    React.useEffect(() => {
        setListConfig(pageConfig);
        getCards(listConfig);
    }, [getCards, listConfig, pageConfig])

    const onSortSelectChange = (value: string) => {
        pageConfig.order = value;
        setListConfig(pageConfig);
        getCards(listConfig);
    }

    const onPaginationChange = (page: number, pageSize: number = 16) => {
        pageConfig.pageNumber = page;
        pageConfig.pageSize = pageSize;
        setListConfig(pageConfig);
        getCards(listConfig)
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
                    size="middle"
                ></Search>
                <Text>Sort by</Text>
                <Select
                    defaultValue="asc"
                    size="middle"
                    onChange={onSortSelectChange}
                >
                    <Option value="asc">Card name: A - Z</Option>
                    <Option value="desc">Card name: Z - A</Option>
                </Select>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    size="large"
                    dataSource={cards.cards}
                    renderItem={(card: HeartStoneCard) => (
                        <List.Item
                            key={card.id}
                            onClick={() => onShowCard(card)}
                        >
                            <img alt={card.name} src={card.image} />
                        </List.Item>
                    )}
                />
                <Pagination
                    defaultCurrent={pageConfig.pageNumber}
                    total={cards.cardCount}
                    onChange={onPaginationChange}
                    pageSize={16}
                    pageSizeOptions={['16', '32', '64']}
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
