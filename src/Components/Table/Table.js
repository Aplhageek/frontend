import React, { useEffect, useState } from 'react'

function Table(
    {
        listings,
        locationFilter,
        priceFilter,
        sortBy
    }
) {

    // States:
    // current page
    // filtered listings
    // selected listings
    const [currentPage, setCurrentPage] = useState();
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    
    let itemsPerPage = 10;
    let displayItems = appplyFilter(filteredData, locationFilter, priceFilter, sortBy);
    let totalPages = Math.ceil(displayItems.length / itemsPerPage);
    let startIndex;
    let endIndex;



    // editing functions

    // Delete fuctions

    // checkbox functions

    // paginatins functions

    // normal methods

    function appplyFilter(filteredData, locationFilter, priceFilter, sortBy) {
        let updatedData = [...filteredData];
        if (locationFilter.length > 0) {
            updatedData = updatedData.filter(listing => locationFilter.includes(listing.city));
        }

        if (priceFilter.length > 0) {
            updatedData = updatedData.filter(listing => {
                let found = false;

                priceFilter.forEach(range => {
                    let low = range.split('-')[0];
                    let high = range.split('-')[1];
                    if (Number(listing.price) >= Number(low) && Number(listing.price) <= Number(high))
                        found = true;
                });

                return found;
            });
        }

        if (sortBy === "price") {
            updatedData.sort((first, second) => first.price - second.price);
        } else if (sortBy === "date") {
            updatedData.sort((first, second) => new Date(first.listing_date) - new Date(second.listing_date));
        }

        console.log("dddddddddddddddddddd", updatedData);

        return updatedData;
    }


    useEffect(() => {
        setFilteredData(listings);
    }, [listings]);

    // this will reduce unnecessary calling of function applyFilter as it is calling outside useEffect
    // useEffect(() =>{
    //     displayItems.current =  appplyFilter(filteredData, locationFilter, priceFilter, sortBy);
    //             console.log( "dddddddddddddddddddd" , displayItems.current);

    // }, [filteredData, locationFilter, priceFilter, sortBy] );


    return (
        <div className='listing_table_container'>
            {/* table */}
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" checked={""} onChange={""} />
                        </th>
                        <th>Property Name</th>
                        <th>Price</th>
                        <th>Address</th>
                        <th>Listing Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayItems.map((item, index) => {
                        return (
                            <tr className='table_row'>
                                <td>
                                    <input type="checkbox" name="" id="" checked={""} />
                                </td>
                                <td className='property_name'> {item.property_name} </td>
                                <td>Rs. {item.price} 8465 </td>
                                <td> {item.address} </td>
                                <td> {item.listing_date} </td>

                                <td className='action_item'>
                                    Delete, Edit
                                </td>

                            </tr>
                        )
                    })}

                </tbody>
            </table>

            {/* table footer */}
        </div>
    )
}

export default Table;