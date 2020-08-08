import React from 'react';
import { Card } from 'antd';
import { Row, Col, Typography } from 'antd';
import { HeartStoneCard } from '../../types/types';

const { Text, Title } = Typography;

const ViewCardModal: React.FC<HeartStoneCard> = ({ image, name, text }) => {
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
