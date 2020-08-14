import React from 'react';
import { Card, Modal } from 'antd';
import ViewCardModal from './CardModal';
import { HeartStoneCard } from '../../types/types';

interface HeartStoneCardProps {
    card: HeartStoneCard;
    showGoldsOnly?: boolean;
    isBattleGrounds?: boolean
}

const HeartStoneCardItem: React.FC<HeartStoneCardProps> = ({ card, showGoldsOnly = false, isBattleGrounds = false }) => {
    const [showCard, setShowCard] = React.useState<boolean>(false);

    return (
        <div>
            <Card
                style={{
                    background: 'transparent'
                }}
                cover={
                    !isBattleGrounds ?
                        <img alt={card.name} src={showGoldsOnly && card.imageGold ? card.imageGold : card.image} /> :
                        <img alt={card.name} src={showGoldsOnly && card.imageGold ? card.battlegrounds.imageGold : card.battlegrounds.image} />
                }
                onClick={() => setShowCard(true)}
            >
            </Card>

            <Modal
                visible={showCard}
                centered
                onOk={() => setShowCard(false)}
                onCancel={() => setShowCard(false)}
            >
                <ViewCardModal
                    card={card}
                    isBattleGrounds={isBattleGrounds}
                ></ViewCardModal>
            </Modal>
        </div>
    )
}

export default HeartStoneCardItem;
