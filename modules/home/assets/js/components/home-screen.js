import { Container, Box } from '@elementor/ui';

import TopSection from './top-section';

const HomeScreen = ( props ) => {
	const videoUrl = 'https://elementor.com/academy/getting-started-with-elementor/',
		embedUrl = 'https://www.youtube.com/embed/icTcREd1tAg?si=40E8D1hdnu26-TXM';

	return (
		<Box maxWidth="xl" sx={ { pr: 1 } }>
			{ /* Box wrapper around the Container is needed to neutralize wp-content area left-padding, that becomes too apparent on smaller screens, and ensure that Container is getting desired width*/ }
			<Container disableGutters={ true } maxWidth="lg" sx={ { display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 3 }, py: { xs: 2, md: 6 } } }>
				<TopSection
					videoUrl={ videoUrl }
					embedUrl={ embedUrl }
					topData={ props.homeScreenData.data.top[ 0 ] }
					createNewPageUrl={ props.homeScreenData.createNewPageUrl }
				/>
			</Container>
		</Box>
	);
};

HomeScreen.propTypes = {
	homeScreenData: PropTypes.object,
};

export default HomeScreen;
