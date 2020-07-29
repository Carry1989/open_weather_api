import React, { Component } from 'react';
import axios from 'axios';
import ListItem from '../../components/ListItem/ListItem';
import DetailsPanel from '../../components/DetailsPanel/DetailsPanel';
import './Dashboard.css';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            listOfLocations: [],
            selectedLocationData: null,
            showInformationPanel: false
        }
    }

    componentDidMount() {
        let localStorageData = JSON.parse(localStorage.getItem("favoriteLocations"));
        if (localStorageData && localStorageData.length > 0) {
            const appID = "0138d665b1edc87c00ee3510b1e704fb";
            for (let item of localStorageData) {
                const ID = item.id;
                axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${ID}&appid=${appID}`)
                    .then(response => {
                        const locationData = response.data;
                        let arrayData = [...this.state.listOfLocations];
                        arrayData.push(locationData);
                        this.setState({ listOfLocations: arrayData });
                    })
                    .catch(error => console.log(error));
            }
        }
    }

    displayWeatherInformation = (selectedLocationData) => {
        this.setState({ showInformationPanel: true, selectedLocationData });
    }

    render() {
        let { listOfLocations, selectedLocationData } = this.state;
        let listItems = <p className="dashboard-paragraph">Please select 5 locations from Settings to view weather information.</p>;
        let detailsPanel = <></>;

        if (listOfLocations && listOfLocations.length > 0) {
            listItems = listOfLocations.map(locationData => {
                return (
                    <ListItem dataReceived={locationData} key={locationData.id}
                        displayWeatherInformation={this.displayWeatherInformation} />
                );
            });
        };

        if (detailsPanel && selectedLocationData) {
            detailsPanel = (
                <div className="details-panel">
                    <DetailsPanel dataReceived={selectedLocationData} />
                </div>
            );
        };

        return (
            <div>
                <h5 className="font-weight-normal dashboard-title">Welcome to your weather dashboard</h5>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="list-group list-items-panel" style={{ width: '80%' }}>
                                {listItems}
                            </div>
                        </div>

                        <div className="col-6">
                            {detailsPanel}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
