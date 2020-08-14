import React from 'react';
import { Card, Modal } from 'antd';
import { HeartStoneCardProps } from '../../types/types';
import ViewCardModal from './CardModal';

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
                ></ViewCardModal>
            </Modal>
        </div>
    )
}

export default HeartStoneCardItem;
