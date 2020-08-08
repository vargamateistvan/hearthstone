import React from 'react';
import { Card } from 'antd';
import { HeartStoneCardProps } from '../../types/types';

const HeartStoneCardItem: React.FC<HeartStoneCardProps> = ({ card, showGoldsOnly = false, isBattleGrounds = false }) => {
    return (
        <Card
            style={{
                background: 'transparent'
            }}
            cover={
                !isBattleGrounds ?
                    <img alt={card.name} src={showGoldsOnly && card.imageGold ? card.imageGold : card.image} /> :
                    <img alt={card.name} src={showGoldsOnly && card.imageGold ? card.battlegrounds.imageGold : card.battlegrounds.image} />
            }
        >
        </Card>
    )
}

export default HeartStoneCardItem;
