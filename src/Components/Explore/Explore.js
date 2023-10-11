import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import axios from 'axios';
import config from '../../config';
import CheckBoxFilter from '../CheckBoxFilter/CheckBoxFilter';
import SortingFilter from '../SortingFilter/SortingFilter';
import Table from '../Table/Table';
import './Explore.css'

const Explore = () => {

    // States
    const [listings, setListings] = useState([]);
    const [locationFilter, setLocationFilter] = useState([]);
    const [priceFilter, setPriceFilter] = useState([]);
    const [sortBy, setSortBy] = useState('');


    async function fetchListings() {
        try {
            const response = await axios.get(`${config.backendEndpoint}/real-estate-data`);
            setListings(response.data.listings);
        } catch (err) {
            console.log(err);
        }

    }


    // Filter Function Definition

    const handleLocationFilterChange = (event) => {
        const isChecked = event.target.checked;

        // if location filter is checked 
        if (isChecked)
            setLocationFilter(prev => [...prev, event.target.value]);
        //  if filter is unchecked 
        else {
            setLocationFilter(prev => prev.filter(item => item !== event.target.value));
        }
    }

    const handlePriceFilterChange = (event) => {
        const isChecked = event.target.checked;
        // if price filter is checked
        if (isChecked)
            setPriceFilter(prev => [...prev, event.target.value]);
        // if filter is unchecked
        else {
            setPriceFilter(prev => prev.filter(item => item !== event.target.value));
        }

    }

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);

    }

    //USEEFFECT
    useEffect(() => {
        fetchListings();
    }, []);

    return (
        <>
            {/* Header.js */}
            <Header onPage='listings' />

            <div className="admin_view_wrapper">



                {/* Checkbox.js */}
                <CheckBoxFilter
                    locationFilter={locationFilter}
                    priceFilter={priceFilter}
                    handleLocationFilterChange={handleLocationFilterChange}
                    handlePriceFilterChange={handlePriceFilterChange}

                />

                {/* SortingFilter */}
                <SortingFilter sortBy={sortBy} handleSortByChange={handleSortByChange} />

                {/* Listing Table */}
                <Table

                    listings={listings}
                    locationFilter={locationFilter}
                    priceFilter={priceFilter}
                    sortBy={sortBy}
                />


            </div>

        </>
    )
}

export default Explore;