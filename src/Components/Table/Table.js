import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';
import { BiSolidEdit } from 'react-icons/bi';
import EditModal from '../EditModal/EditModal';
import './table.css';

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
    const [editingItems, setEditingItems] = useState(null);
    const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);


    let itemsPerPage = 10;
    let displayItems = appplyFilter(filteredData, locationFilter, priceFilter, sortBy);

    // return immediate higher integer 
    let totalPages = Math.ceil(displayItems.length / itemsPerPage);
    let endIndex = currentPage * itemsPerPage;
    let startIndex = endIndex - itemsPerPage;


    // To handle edge case where at the last page there will be less number of rows
    let isSelectedAll = displayItems.length !== 0 && (selectedRows.length === (currentPage === totalPages ? displayItems.slice(startIndex).length : itemsPerPage));


    // editing functions

    const handleEdit = (item) => {
        setEditingItems(item);
        setIsEditingModalOpen(true);
    };

    const handleEditSave = (editedItem) => {
        const updatedData = [...filteredData];

        const indexOfItem = updatedData.findIndex(data => data.property_id === editedItem.property_id);

        if (indexOfItem >= 0) {
            updatedData[indexOfItem] = editedItem;
            setFilteredData(updatedData);
            handleEditCancel();
        }
    };

    const handleEditCancel = () => {
        setIsEditingModalOpen(false);
        setEditingItems(null);
    };

    // Delete fuctions
    const checkPage = (newData) => {
        const updatedPage = Math.ceil(newData.length / itemsPerPage);
        if (currentPage > updatedPage) {
            setCurrentPage(updatedPage);
        }
    }

    const handleDelete = (id) => {
        const updatedData = filteredData.filter(data => data.property_id !== id);
        setFilteredData(updatedData);
        // to reset the selected rows array
        const updatedSelectedRows = selectedRows.filter(data => data !== id);
        setSelectedRows(updatedSelectedRows);
        checkPage(updatedData);
    };

    const handleDeleteAllSelected = () => {
        if (selectedRows.length === 0) {
            alert("please selecte rows to delete");
            return;
        }

        const updatedData = filteredData.filter(data => !selectedRows.includes(data.property_id));
        checkPage(updatedData);
        setFilteredData(updatedData);
        setSelectedRows([]);
    };

    // checkbox functions
    const handleSelectAll = (event, displayItems) => {
        const isALlChecked = event.target.checked;

        if (isALlChecked) {
            const endIndex = currentPage * itemsPerPage;
            const startIndex = endIndex - itemsPerPage;

            // Do not addthe elements in for loop one by oneas the state change will call render
            const rows = [];

            for (let i = startIndex; i < endIndex && i < displayItems.length; i++) {
                rows.push(displayItems[i].property_id);
            }
            setSelectedRows(rows);
            
        } else {
            setSelectedRows([]);
            isSelectedAll = false;
        }
    };

    const handleRowCheckBoxChange = (event, id) => {
        event.target.checked ? setSelectedRows(prev => [...prev, id]) : setSelectedRows(prev => prev.filter(item => item !== id));
    };
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

        // console.log("dddddddddddddddddddd", updatedData);

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

    useEffect(() => {
        setSelectedRows([]);
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [locationFilter, priceFilter]);

    // console.log(selectedRows, "selectedRows");
    // console.log(selectedRows, "sssssssssss");


    return (
        <div className='listing_table_container'>
            {/* table */}
            <table>


                {/* displayItems | isSelectedAll | handleSelectAll */}
                <thead>
                    <tr>
                        <th>
                            <input disabled={displayItems.length === 0} type="checkbox" checked={isSelectedAll} onChange={(event) => handleSelectAll(event, displayItems)} />
                        </th>
                        <th>Property Name</th>
                        <th>Price</th>
                        <th>Address</th>
                        <th>Listing Date</th>
                        <th>Action</th>
                    </tr>
                </thead>




                {/* displayItems | startIndex | endIndex | selectedRows | handleRowCheckBoxChange | handleDelete | handleEdit */}
                <tbody>
                    {displayItems.slice(startIndex, endIndex).map((item, index) => {
                        return (
                            <tr className={`table_row ${selectedRows.includes(item.property_id) ? "selected_Row" : ""}`} key={index}>
                                <td>
                                    <input type="checkbox" checked={selectedRows.includes(item.property_id)} onChange={(event) => handleRowCheckBoxChange(event, item.property_id)} />
                                </td>
                                <td className='property_name'> {item.property_name} </td>
                                <td>Rs. {item.price} </td>
                                <td> {item.address} </td>
                                <td> {item.listing_date} </td>

                                <td className='action_item'>
                                    <MdDelete className='action_buttons' onClick={() => handleDelete(item.property_id)} />
                                    <BiSolidEdit  className='action_buttons' onClick={() => handleEdit(item)} />
                                </td>

                            </tr>
                        )
                    })}

                </tbody>
            </table>



            {/* handleDeleteAllSelected | totalPages | currentPage | setCurrentPage |  */}

            <div className="table_footer">
                <button className='delete_selected_btn' onClick={handleDeleteAllSelected}>Delete selected</button>
                <div className="pagination_container">
                    <span>Page {totalPages < 1 ? 0 : currentPage} of {totalPages}</span>
                    <div className="pagination">
                        {/* for when page becomes 0 it keeps on changing the page number as earlier we were only compare it with 1 */}
                        <button disabled={currentPage <= 1} onClick={() => setCurrentPage(1)}>First</button>
                        <button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
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



            {/* itemToEdit  */} {/* handleEditSave */} {/* handleEditCancel */}
            {
                isEditingModalOpen && <EditModal item={editingItems} onSave={handleEditSave} onClose={handleEditCancel} />
            }
        </div>
    )
}

export default Table;