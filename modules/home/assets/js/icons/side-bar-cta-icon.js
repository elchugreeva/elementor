import * as React from 'react';
import { SvgIcon } from '@elementor/ui';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';

const SideBarIcon = ( { ...props } ) => {
	// let pathElements;
	// useEffect( () => {
	// 	fetch( props.url )
	// 		.then( ( response ) => response.text() )
	// 		.then( ( svgText ) => {
	// 			// Once you have the SVG content as text, you can parse it
	// 			const parser = new DOMParser();
	// 			const svgDoc = parser.parseFromString( svgText, 'image/svg+xml' );
	//
	// 			// You can then extract the path element(s) from the SVG
	// 			pathElements = svgDoc.getElementsByTagName( 'path' );
	//
	// 			// Assuming you want to extract the data from the first path element
	// 			if ( pathElements.length > 0 ) {
	// 				const pathData = pathElements[ 0 ].getAttribute( 'd' );
	// 				console.log( pathData ); // This is your SVG path data
	// 			}
	// 		} )
	// 		.catch( ( error ) => {
	// 			console.error( 'Error fetching SVG:', error );
	// 		} );
	// }, [] );
	return (
		<SvgIcon viewBox="0 0 21 15">
			{/*{ pathElements }*/ }
			<path fill-rule="evenodd" clip-rule="evenodd" d="M8.79297 0.665649C9.00194 0.665649 9.19709 0.770088 9.313 0.943962L12.2682 5.37675L15.9025 2.46927C16.1077 2.30517 16.3935 2.28685 16.6179 2.42342C16.8423 2.55999 16.9574 2.8223 16.9058 3.07989L15.2392 11.4132C15.1807 11.7054 14.9242 11.9156 14.6263 11.9156H2.95964C2.66171 11.9156 2.4052 11.7054 2.34678 11.4132L0.680109 3.07989C0.628592 2.8223 0.743642 2.55999 0.968039 2.42342C1.19244 2.28685 1.47828 2.30517 1.68341 2.46927L5.31775 5.37675L8.27294 0.943962C8.38886 0.770088 8.584 0.665649 8.79297 0.665649ZM8.79297 2.41738L5.97967 6.63734C5.8825 6.78309 5.72862 6.88138 5.55552 6.90825C5.38243 6.93512 5.20599 6.88812 5.0692 6.77869L2.24232 4.51719L3.47202 10.6656H14.1139L15.3436 4.51719L12.5167 6.77869C12.38 6.88812 12.2035 6.93512 12.0304 6.90825C11.8573 6.88138 11.7034 6.78309 11.6063 6.63734L8.79297 2.41738Z"/>
		</SvgIcon>
	);
};

SideBarIcon.propTypes = {
	url: PropTypes.object.isRequired,
};
export default SideBarIcon;
