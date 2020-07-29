import React, { Component } from 'react';
import { cities } from '../../models/locations';
import './Settings.css';

export default class Settings extends Component {
    constructor() {
        super();
        this.state = {
            cities: cities,
            searchTerm: ''
        }
    };

    addToLocalStorage = (location) => {
        let dataArray = JSON.parse(localStorage.getItem("favoriteLocations"));

        if (dataArray && dataArray.length < 5) {
            let newData = [...dataArray];
            newData.push(location);
            localStorage.setItem("favoriteLocations", JSON.stringify(newData));
        }

        if (!dataArray) {
            let array = [location];
            localStorage.setItem("favoriteLocations", JSON.stringify(array));
        }
    };

    searchCity = (e) => {
        this.setState({ searchTerm: e.target.value });
        const searchedCities = cities.filter(city => city.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
        this.setState({ cities: searchedCities });
    }

    render() {
        const { cities, searchTerm } = this.state;
        const searchLogo = (
            <svg className="svg-icon-search" viewBox="0 0 20 20">
                <path fill="none" d="M12.323,2.398c-0.741-0.312-1.523-0.472-2.319-0.472c-2.394,0-4.544,1.423-5.476,3.625C3.907,7.013,3.896,8.629,4.49,10.102c0.528,1.304,1.494,2.333,2.72,2.99L5.467,17.33c-0.113,0.273,0.018,0.59,0.292,0.703c0.068,0.027,0.137,0.041,0.206,0.041c0.211,0,0.412-0.127,0.498-0.334l1.74-4.23c0.583,0.186,1.18,0.309,1.795,0.309c2.394,0,4.544-1.424,5.478-3.629C16.755,7.173,15.342,3.68,12.323,2.398z M14.488,9.77c-0.769,1.807-2.529,2.975-4.49,2.975c-0.651,0-1.291-0.131-1.897-0.387c-0.002-0.004-0.002-0.004-0.002-0.004c-0.003,0-0.003,0-0.003,0s0,0,0,0c-1.195-0.508-2.121-1.452-2.607-2.656c-0.489-1.205-0.477-2.53,0.03-3.727c0.764-1.805,2.525-2.969,4.487-2.969c0.651,0,1.292,0.129,1.898,0.386C14.374,4.438,15.533,7.3,14.488,9.77z"></path>
            </svg>
        );
        const locationsMapped = cities.map(location => {
            return (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={location.id}>
                    {location.name}
                    <button type="button"
                        onClick={() => this.addToLocalStorage(location)}
                        className="btn btn-primary btn-custom">+</button>
                </li>
            );
        });

        return (
            <div>
                <h5 className="font-weight-normal settings-title">Settings</h5>

                <div className="input-group mb-3 search-box">
                    <input type="text" className="form-control"
                        placeholder="Search city"
                        aria-label="Search city"
                        value={searchTerm}
                        onChange={this.searchCity}
                        aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">{searchLogo}</span>
                    </div>
                </div>

                <ul className="list-group table">
                    {locationsMapped}
                </ul>
            </div>
        );
    }
}
