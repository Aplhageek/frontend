import React, { useEffect, useState } from 'react'
import './Listing.css';
import axios from 'axios';
import config from '../../config';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// card imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';



const listingPath = "real-estate-data";


const Listing = () => {
    const [listingData, setListingData] = useState([]);

    const fetchData = async (listingPath, setterFunc) => {
        try {
            const respose = await axios.get(`${config.backendEndpoint}/${listingPath}`);
            console.log(respose.data.listings.slice(0, 8));
            setterFunc(respose.data.listings.slice(0, 8));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData(listingPath, setListingData);
    }, []);

    return (
        <div className='listing_wrapper'>

            {listingData?.length  > 0 && <h2 className="listing_title">Here are some of our featured listings:</h2>}
            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                {
                    listingData?.length === 0 ? (
                        <Grid item >
                            <p className="error_msg">No Listings Found</p>
                        </Grid>
                    ) : (

                        listingData.map((listing, index) => {
                            return (
                                <Grid item sx={12} sm={6} md={3} key={listing.property_id}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={`/assets/real-estate-${index}.jpg`}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <Typography className='property_name' gutterBottom variant="h5" component="div">
                                                    {listing.property_name.split(' ')[0]}
                                                </Typography>
                                            </CardContent>
                                            <CardActions >
                                                <div className="listing_details">
                                                    <span className="property_price"> Rs. {listing.price}</span>
                                                    <span className="property_city">  {listing.city}</span>
                                                </div>
                                            </CardActions>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })

                    )
                }
                <Grid item xs={8}>

                </Grid>
            </Grid>
        </div>
    )
}

export default Listing;