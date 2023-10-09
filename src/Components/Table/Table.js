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
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    let itemsPerPage = 10;
    let displayItems = appplyFilter(filteredData, locationFilter, priceFilter, sortBy);
    // return immediate higher integer 
    let totalPages = Math.ceil(displayItems.length / itemsPerPage);


    let endIndex = currentPage * itemsPerPage;
    let startIndex = endIndex - itemsPerPage;




    // editing functions

    // Delete fuctions

    // checkbox functions

    // paginatins functions

    // normal methods


    /**
 * Apply Filters and Sorting to a List of Real Estate Listings
 *
 * This function takes a list of real estate listings, applies filters based on location and price,
 * and sorts the filtered list based on the selected sorting criteria.
 *
 * @param {Array} filteredData - The initial list of real estate listings to be filtered and sorted.
 * @param {Array} locationFilter - An array of selected location filters (cities).
 * @param {Array} priceFilter - An array of selected price range filters (e.g., ['1000-2000', '2000-3000']).
 * @param {string} sortBy - The sorting criteria ('price' or 'date').
 * @returns {Array} - The filtered and sorted list of real estate listings.
 */
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

    // to get number of pages

    const getPageNumber = (totalPages) => {
        const pageNumber = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumber.push(i);
        }
        return pageNumber;
    }

    const pageNumber = getPageNumber(totalPages);


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
                    {displayItems.slice(startIndex, endIndex).map((item, index) => {
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

            <div className="table_footer">
                <button>Delete selected</button>
                <div className="pagination_container">
                    <span>Page {totalPages < 1 ? 0 : currentPage} of {totalPages}</span>
                    <div className="pagination">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                        {/* Loop */}
                        {
                            pageNumber.map(page => {
                                return (<button key={page} onClick={() => setCurrentPage(page)}> {page}</button>)
                            })
                        }
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Table;