import React from 'react';
import { Card } from 'antd';
import { Row, Col, Typography } from 'antd';
import { CardModalProps } from '../../types/types';

const { Text, Title } = Typography;

const ViewCardModal: React.FC<CardModalProps> = ({ card }) => {
    const { image, name, text } = card;
    return (
        <Card
        >
            <Row
                justify="space-between"
            >
                <Col span={12}>
                    <img alt={name} src={image} />
                </Col>
                <Col span={12}>
                    <Title level={2}>{name}</Title>
                    <Text>{text}</Text>
                </Col>
            </Row>
        </Card>
    )
}

export default ViewCardModal;
