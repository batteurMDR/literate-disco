import React, { Component } from 'react'
import { Chart } from "react-google-charts"
import Axios from 'axios'
import { Link } from 'react-router-dom';
import {API_URL} from '../../constants';

export default class Country extends Component {

    countryCode = null;

    constructor(props) {
        super(props);
        this.state = {
            countryId: null,
            warehouses: [],
            ordersByCategories: [],
            orders: []
        }

        this.countryCode = this.props.match.params.counrtyCode;
    }

    componentDidMount() {
        Axios.get("http://" + API_URL + "/api/country_code/" + this.countryCode).then((response) => {
            this.setState({countryId: response.data.id});
            Axios.get("http://" + API_URL + "/api/warehouses/" + response.data.id).then((response) => {
                this.setState({warehouses: response.data});
            });
            Axios.get("http://" + API_URL + "/api/order_items/" + response.data.id).then((response) => {
                this.setState({ordersByCategories: response.data});
            });
            Axios.get("http://" + API_URL + "/api/order_items").then((response) => {
                this.setState({orders: response.data});
            });
        });
    }

    render() {
        if (this.state.countryId == null) {
            return <span>Chargement...</span>
        }
        console.log(this.state.orders)
        return (
            <>
                <Link to="/">&#60; Retour</Link>
                <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'no-wrap', justifyContent: 'space-around', alignItems: 'center'}}>
                    <Chart
                        width={'80%'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            [
                              'Date', 'Orders'
                            ],
                            ...this.state.orders
                        ]}
                        options={{
                            hAxis: {
                              title: 'Time',
                            },
                            vAxis: {
                              title: 'Orders',
                            },
                            backgroundColor: '#1b1b1b',
                            title: 'Evolution of sales by category',
                            titleTextStyle: {
                                color: '#ffffff'
                            },
                            legend: {
                                textStyle: {
                                    color: '#ffffff'
                                }
                            }
                        }}
                        rootProps={{ 'data-testid': '1' }}
                      />
                    <Chart
                        width={'80%'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Category', 'Order'],
                            ...this.state.ordersByCategories
                        ]}
                        options={{
                            title: 'Orders by categories',
                            is3D: true,
                            backgroundColor: '#1b1b1b',
                            titleTextStyle: {
                                color: '#ffffff'
                            },
                            legend: {
                                textStyle: {
                                    color: '#ffffff'
                                }
                            }
                        }}
                        rootProps={{ 'data-testid': '2' }}
                        />
                    <h2>Warehouses</h2>
                    <Chart
                        width={'80%'}
                        chartType="GeoChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Location', 'Name'],
                            ...this.state.warehouses.map((w) => [w.location.city, w.name])
                        ]}
                        options={{
                            colorAxis: {minValue: 0, colors: ['#ff8a80', '#d50000']},
                            backgroundColor: '#1b1b1b',
                            datalessRegionColor: '#6d6d6d',
                            defaultColor: '#d50000',
                            enableRegionInteractivity: true,
                            region: this.countryCode,
                            displayMode: "markers",
                        }}
                        mapsApiKey="AIzaSyCO5l9hTuAV_lAdZImI22bC_oxYcosDgqI"
                        />
                </div>
            </>
        )
    }
}
