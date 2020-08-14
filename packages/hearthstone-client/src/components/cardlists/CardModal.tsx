import React from 'react';
import { Card } from 'antd';
import { Row, Col, Typography } from 'antd';
import { HeartStoneCard } from '../../types/types';

const { Text, Title } = Typography;

export interface CardModalProps {
    card: HeartStoneCard;
    isBattleGrounds: boolean;
}

const ViewCardModal: React.FC<CardModalProps> = ({ card, isBattleGrounds = false }) => {
    const { image, battlegrounds, name, text } = card;
    return (
        <Card
        >
            <Row
                justify="space-between"
            >
                <Col span={12}>
                    {!isBattleGrounds ?
                        <img alt={name} src={image} /> :
                        <img alt={name} src={battlegrounds.image} />
                    }                </Col>
                <Col span={12}>
                    <Title level={2}>{name}</Title>
                    <Text>{text}</Text>
                </Col>
            </Row>
        </Card>
    )
}

export default ViewCardModal;
