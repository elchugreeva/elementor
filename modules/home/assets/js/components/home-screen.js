import { Container, Box } from '@elementor/ui';
import TopSection from './top-section';
import SideBarPromotion from './sidebar-promotion';
import GetStarted from './get-started-section';

const HomeScreen = ( props ) => {
	const hasSidebarUpgrade = props.homeScreenData.hasOwnProperty( 'sidebar_upgrade' );

	return (
		/*  Box wrapper around the Container is needed to neutralize wp-content area left-padding */
		<Box sx={ { pr: 1 } }>
			<Container disableGutters={ true } maxWidth="lg" sx={ { display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 3 }, pt: { xs: 2, md: 6 }, pb: 2 } }>
				<TopSection
					topData={ props.homeScreenData.top }
					createNewPageUrl={ props.homeScreenData.create_new_page_url }
				/>
				<Container disableGutters={ true } sx={ { display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', gap: 3 } }>
					<Container maxWidth="md" disableGutters={ true }>
						<GetStarted getStartedData={ props.homeScreenData.get_started } />
					</Container>
					<Container maxWidth="xs" disableGutters={ true } sx={ { width: { md: '305px' } } }>
						{ hasSidebarUpgrade &&
							<SideBarPromotion sideData={ props.homeScreenData.sidebar_upgrade } />
						}
					</Container>
				</Container>
			</Container>
		</Box>
	);
};

HomeScreen.propTypes = {
	homeScreenData: PropTypes.object,
};

export default HomeScreen;
