import React from "react";

const location = ["Amper", "Sintra", "Świnna", "Hanji"];
const prices = ["0-300000", "300001-600000", "600001-1000000"];

function CheckBoxFilter({
    locationFilter,
    priceFilter,
    handleLocationFilterChange,
    handlePriceFilterChange,
}) {
    return (
        <div className="checkbox_filter_container">
            {/* location filter */}
            <div className="filter">
                <h2>Location</h2>
                {location.map((city, index) => {
                    return (
                        <div  key={index}>
                            <label>
                                <input 
                                    type="checkbox"
                                    name={city}
                                    id={city}
                                    // To cheque ifa particular location is already checked or not  
                                    checked={locationFilter.includes(city)}
                                    onChange={handleLocationFilterChange}
                                    value={city}
                                />{" "}
                                {city}
                            </label>
                        </div>
                    );
                })}
            </div>

            {/* Price Filter */}
            <div className="filter">
                <h2>Price Range</h2>
                {prices.map((range, index) => {
                    return (
                        <div  key={index}>
                            <label>
                                <input
                                   
                                    type="checkbox"
                                    name={index}
                                    id={index}
                                    // To cheque ifa particular price is already checked or not.
                                    checked={priceFilter.includes(range)}
                                    // To lift the state up
                                    onChange={handlePriceFilterChange}
                                    value={range}
                                />{" "}
                                {range}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CheckBoxFilter;
