import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link  } from "react-router-dom";
import localStorageService from "../../services/localStorage.service";
import SelectField from "../common/form/selectField";
import { getCountries } from "../../store/countries";
import { getCities } from "../../store/cities";
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

const Search = () => {
    const initialState = {
        destination: "",
        dateFrom: new Date(),
        dateTo: addDays(new Date(), 1),
        countGuests: Number(1)
    }
    const localData = {
        destination: localStorageService.getSearchDataDestination(),
        dateFrom: localStorageService.getSearchDataDateFrom(),
        dateTo: localStorageService.getSearchDataDateTo(),
        countGuests: localStorageService.getSearchDataCountGuests()
    }
    const initialData = localData.destination ? localData : initialState;
    const [data, setData] = useState(initialData);
    
    const countries = useSelector(getCountries());
    const cities = useSelector(getCities());
    const allDestinations = countries && cities ? [...countries, ...cities] : [];
    const allDestinationsList = allDestinations.map(dest => ({
        label: dest.name,
        value: dest._id
    }))
    const handleChange = (target) => {
        if (target.name === "countGuests") {
            setData( (prevState) => ({
                ...prevState,
                [target.name]: Number(target.value)
            }));
        } else {
            setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))}       
    };
    useEffect(()=>{
        localStorageService.setSearchData({...data});
    }, [data])
    const handleClear = (e) => {
        e.preventDefault();
        setData(initialState);
        localStorageService.removeSearchData();
    }
    return (
        <div className="container p-2">
            <form>
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                    <div className="bg-warning bg-opacity-50 border border-secondary border-3 rounded-2 text-center fs-4">
                        <SelectField
                            label="country or city"
                            value={data.destination}
                            name="destination"
                            defaultOption="choose destination"
                            onChange={handleChange}
                            options = {allDestinationsList}
                            classNames="bg-warning bg-opacity-10 border-0"
                        />
                    </div>
                    <div className="bg-warning bg-opacity-50 border border-secondary border-3 rounded-3 text-center fs-4">
                        <label htmlFor="datePicker" className="form-label">date of your trip</label>              
                        <DatePicker
                            className="bg-warning bg-opacity-10 border-0 picker text-center"
                            id="datePicker"
                            name="datePicker"
                            placeholderText="choose date"
                            selectsRange={true}
                            startDate={data.dateFrom}
                            endDate={data.dateTo}
                            onChange={range => {
                                setData(prevState => ({
                                    ...prevState,
                                    dateFrom: range[0],
                                    dateTo: range[1]
                                })); 
                                localStorageService.setSearchData(data)
                            }}
                            minDate={Date.now()}
                            dateFormat="dd/MM/yyyy"                        
                        />
                    </div>
                    <div className="d-flex flex-column bg-warning bg-opacity-50 border border-secondary border-3 rounded-3 text-center fs-4">
                        <label htmlFor="countGuests" className="form-label">count of guests</label>
                        <input
                            placeholder="count of guests"
                            type="number"
                            className="bg-warning bg-opacity-10 border-0 text-center"
                            name="countGuests"
                            id="countGuests"
                            value={data.countGuests}
                            min="1"
                            onChange={e=> handleChange(e.target)}
                        />
                    </div>
                    <Link to={{ pathname:"/hotels", state: data}}>       
                        <button className="btn btn-secondary px-2 py-4 fs-4 mx-1">
                            Seacrch!
                        </button>
                    </Link>
                    <button className="btn btn-secondary bg-opacity-10 px-2 py-4 fs-4" onClick={handleClear}>
                            Clear
                        </button>
                </div>
            </form>
        </div>
    );
}
 
export default Search;