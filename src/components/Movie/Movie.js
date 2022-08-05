import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';


function Movie(props) {


    const { id, title, duration, rating, posterImgPath } = props;

    const styles = {
        card: {
            margin: 20,
            width: 250,
        },
        media: {
            height: 350,
        },
        button: {
            backgroundColor: "#00b9c9"
        },
        link: {
            textDecoration: "none",
            boxShadow: "none",
        }

    };

    return (

        <div>
            <Card style={styles.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={posterImgPath}
                        alt="Poster"
                        style={styles.media}

                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" fontSize={20}>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {duration} dakika <br></br>
                            {rating} <br></br>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'center' }} >

                    <Link to={{ pathname: '/movies/' + id }} style={styles.link}>
                        <Button variant='contained' sx={styles.button} >
                            Detay
                        </Button>
                    </Link>

                </CardActions>
            </Card>

        </div>

    );

}
export default Movie;