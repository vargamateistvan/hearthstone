import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { CardBackCard } from '../../../types/types';
import { List, Layout } from 'antd';
import theme from '../../../theme';

const CARD_BACKS = gql`
  query getCardProperties {
	cardBacks {
		name
		image
	}
  }
`;

const CardBackList: React.FC = () => {
	const { loading, data } = useQuery(CARD_BACKS);

	return (
		<Layout style={{ backgroundColor: theme.lightBrown, color: theme.primary }}>
			{data ?
				<div>
					<List
						grid={{ xs: 1, sm: 2, md: 3, lg: 4 }}
						size="large"
						dataSource={data.cardBacks}
						loading={loading}
						renderItem={(cardBack: CardBackCard) => (
							<List.Item
								key={cardBack.id}
							>
								<img alt={cardBack.name} src={cardBack.image} />
							</List.Item>
						)}
					/>
				</div>
				: null
			}
		</Layout>
	)
}

export default CardBackList;
