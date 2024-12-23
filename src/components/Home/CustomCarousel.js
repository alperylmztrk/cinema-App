
import { Box, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';


const images = ['https://picsum.photos/seed/picsum/536/354', 'https://picsum.photos/id/1084/536/354?grayscale']


function CustomCarousel(props) {
    var items = props.filmList

    return (
        <Carousel height={500} interval={5000} animation='slide' indicatorContainerProps={{ style: { marginTop: '2vh' } }}>
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )


    function Item(props) {
        return (
            <Box height={'100%'} sx={{
                backgroundImage: `url(${props.item.posterImgPath})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat', // Değiştirildi
                width: '100%',
                height: '100%', // Div'i tam kapla
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <h2>{props.item.title}</h2>
                <p>{props.item.genre}</p>

                <Link to={{ pathname: '/movies/' + props.item.id }} >
                        <Button>
                            Detay
                        </Button>
                    </Link>
            </Box>
        )
    };
}

export default CustomCarousel;
