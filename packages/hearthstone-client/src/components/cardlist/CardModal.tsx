import React from 'react';
import { Card } from 'antd';
import { Row, Col, Typography, Space } from 'antd';
import { HeartStoneCard } from '../../types';

const { Text, Title } = Typography;

const ViewCardModal: React.FC<HeartStoneCard> = ({ image, name }) => {
    return (
        <Card
        >
            <Row
                justify="space-between"
            >
                <Col span={6}>
                    <img src={image} />
                </Col>
                <Col span={6}>
                    <Title level={2}>{name}</Title>
                </Col>
            </Row>
        </Card>
    )
}

export default ViewCardModal;
