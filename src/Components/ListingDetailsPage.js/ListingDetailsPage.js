import React, { useEffect, useState } from 'react'
import './ListingDetailsPage.css';
import Header from '../Header/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config'
import { BiSad } from 'react-icons/bi';



const ListingDetailsPage = () => {

    const [property, setProperty] = useState(null);

    const { property_id } = useParams();

    const fetchListing = async (property_id) => {
        try {
            const respose = await axios.get(`${config.backendEndpoint}/real-estate-data`);
            const data = respose.data.listings;
            setProperty(data.find(obj => obj.property_id === Number(property_id)));
        } catch (error) {
            setProperty(null);
            console.log(error);
        }
    }

    useEffect(() => {
        fetchListing(property_id);
        document.title = "Listing";
    }, []);


    return (
        <>
            <Header onPage="details" />

            <div className="lsiting_detail_container">
                {property ? (
                    <>
                    <div className='img_container'>
                        <img src="/assets/real-estate-detail.jpg" alt="real-eastate-detail" />

                    </div>
                    <div className="property_details">
                        <div>
                        <h1>{property.property_name}</h1>
                        <p className='propert_description'> {property.description} </p>
                        </div>

                        <div className="agent_details">
                            <h2>Contact</h2>
                            <div className="contact_row">
                                <span>Agent Name:</span>
                                <span>Jogn Smith</span>
                            </div>
                            <div className="contact_row">
                                <span>Email:</span>
                                <span>jogn@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    </>
                ) :
                    (<div className="error_message">Property Unavailable <BiSad/> </div>)
                }
            </div>

        </>
    )
}

export default ListingDetailsPage;