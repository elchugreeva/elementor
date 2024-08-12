import { useEffect, useState } from 'react';
import Launchpad from './launchpad';

const Checklist = () => {
	const [ isOpen, setIsOpen ] = useState( true );

	const handleClick = () => {
		setIsOpen( ! isOpen );
	};

	useEffect( () => {
		elementor.on( 'elementor/editor/panel/checklist/clicked', () => setIsOpen( ! isOpen ) );
	}, [] );

	return isOpen ? <Launchpad setIsOpen={ setIsOpen } /> : null;
};

export default Checklist;
