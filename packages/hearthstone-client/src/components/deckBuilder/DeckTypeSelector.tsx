import React from 'react';
import { Layout, Divider, Typography, Button, Row, Col } from 'antd';
import theme from '../../theme';

const { Title } = Typography;

interface DeckTypeSelectorProps {
    setSelectedType: Function;
}

const DeckTypeSelector: React.FC<DeckTypeSelectorProps> = ({ setSelectedType }) => {
    return (
        <Layout style={{ backgroundColor: theme.lightBrown, color: theme.primary }}>
            <Divider orientation="left" plain>
                <Title>Select deck type</Title>
            </Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col flex={6}>
                    <Button block size="large" onClick={() => setSelectedType('standard')}>
                        <Title>Standard</Title>
                    </Button>
                </Col>
                <Col flex={6}>
                    <Button block size="large" onClick={() => setSelectedType('wild')}>
                        <Title>Wild</Title>
                    </Button>
                </Col>
            </Row>
        </Layout>
    )
}

export default DeckTypeSelector;
