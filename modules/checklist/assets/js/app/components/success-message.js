import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@elementor/ui';
import useAjax from 'elementor-app/hooks/use-ajax';
import { useEffect } from 'react';

const SuccessMessage = () => {
	const { ajaxState, setAjax } = useAjax();

	const hideChecklist = () => {
		setAjax( {
			data: {
				action: 'elementor_ajax',
				actions: JSON.stringify( {
					save_editorPreferences_settings: {
						action: "save_editorPreferences_settings",
						data: {
							data: {
								show_launchpad_checklist: ""
							}
						}
					},
				} ),
			},
		} );
	}

	useEffect( () => {
		switch ( ajaxState.status ) {
			case 'success':
				$e.commands.run( 'checklist/toggle-icon', false );
				break;
			case 'error':
				break;
		}
	}, [ ajaxState ] );


	return (
		<Card elevation={ 0 } square={ true } className="e-checklist-done">
			<CardMedia
				image="https://assets.elementor.com/checklist/v1/images/checklist-step-7.jpg"
				sx={ { height: 180 } }
			/>
			<CardContent sx={ { textAlign: 'center' } }>
				<Typography variant="h6" color="text.primary">{ __( 'You\'re on your way!', 'elementor' ) }</Typography>
				<Typography variant="body2" color="text.secondary" component="p">
					{ __( 'With these steps, you\'ve got a great base for a robust website. Enjoy your web creation journey!', 'elementor' ) }
				</Typography>
			</CardContent>
			<CardActions sx={ { justifyContent: 'center' } }>
				<Button
					color="primary"
					size="small"
					variant="contained"
					onClick={ hideChecklist }
				>
					{ __( 'Got it', 'elementor' ) }
				</Button>
			</CardActions>
		</Card>
	);
};

export default SuccessMessage;
