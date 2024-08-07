import Button from '@elementor/ui/Button';
import Card from '@elementor/ui/Card';
import CardContent from '@elementor/ui/CardContent';
import CardActions from '@elementor/ui/CardActions';
import Typography from '@elementor/ui/Typography';
import ListItemButton from '@elementor/ui/ListItemButton';
import ListItemIcon from '@elementor/ui/ListItemIcon';
import ListItemText from '@elementor/ui/ListItemText';
import Collapse from '@elementor/ui/Collapse';
import ChevronDownIcon from '@elementor/icons/ChevronDownIcon';
import RadioButtonUncheckedIcon from "@elementor/icons/RadioButtonUncheckedIcon";
import CardMedia from '@elementor/ui/CardMedia';

function CheckListItem( props ) {
	const { id, title, imagePath, description, link, CTA } = props.step,
		[ expanded, setExpanded ] = React.useState( false );

	const handleExpandClick = () => {
		setExpanded( ! expanded );
	};

	return (
		<>
			<ListItemButton onClick={ () => handleExpandClick( id ) } sx={{
				"&.MuiButtonBase-root:hover": {
					bgcolor: "transparent"
				}
			}}>
				<ListItemIcon> <RadioButtonUncheckedIcon/> </ListItemIcon>
				<ListItemText id={ title } primary={ <Typography variant="body2">{title}</Typography> } />
				{ expanded ? <ChevronDownIcon sx={ { transform: 'rotate(180deg)'} } /> : <ChevronDownIcon /> }
			</ListItemButton>
			<Collapse in={ expanded } >
				<Card elevation={ 0 } square="true">
					<CardMedia
						image="https://elementor.com/cdn-cgi/image/f=auto,w=1100/https://elementor.com/wp-content/uploads/2022/01/Frame-10879527.png"
						sx={ { height: 180 } }
					/>
					<CardContent>
						<Typography variant="body2" color="text.secondary" component="p">
							{ description + ' ' }
							<a href={ link } target="_blank" rel="noreferrer">Learn more</a>
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small" color="secondary">Mark as completed</Button>
						<Button size="small" variant="contained">{ CTA }</Button>
					</CardActions>
				</Card>
			</Collapse>
		</>
	);
}

export default CheckListItem;
