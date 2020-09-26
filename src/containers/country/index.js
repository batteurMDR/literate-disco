import React, { Component } from 'react'
import { Chart } from "react-google-charts"
import Axios from 'axios'
import { Link } from 'react-router-dom';

export default class Country extends Component {

    countryCode = null;

    constructor(props) {
        super(props);
        this.state = {
            countryId: null,
            warehouses: [],
            orders: []
        }

        this.countryCode = this.props.match.params.counrtyCode;
    }

    componentDidMount() {
        Axios.get("/api/country_code/" + this.countryCode).then((response) => {
            this.setState({countryId: response.data.id});
            Axios.get("/api/warehouses/" + response.data.id).then((response) => {
                this.setState({warehouses: response.data});
            });
            Axios.get("/api/order_items/" + response.data.id).then((response) => {
                this.setState({orders: response.data});
            });
        });
    }

    render() {
        if (this.state.countryId == null) {
            return <span>Chargement...</span>
        }
        console.log(this.state.warehouses.map((w) => [w.location.city, w.name]))
        return (
            <>
                <Link to="/">Retour</Link>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center'}}>
                    <Chart
                        width={'50%'}
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
                            displayMode: "markers"
                        }}
                        mapsApiKey="AIzaSyCO5l9hTuAV_lAdZImI22bC_oxYcosDgqI"
                        />
                    <Chart
                        width={'50%'}
                        chartType="Histogram"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Dinosaur', 'Length'],
                            ['Acrocanthosaurus (top-spined lizard)', 12.2],
                            ['Albertosaurus (Alberta lizard)', 9.1],
                            ['Allosaurus (other lizard)', 12.2],
                            ['Apatosaurus (deceptive lizard)', 22.9],
                            ['Archaeopteryx (ancient wing)', 0.9],
                            ['Argentinosaurus (Argentina lizard)', 36.6],
                            ['Baryonyx (heavy claws)', 9.1],
                            ['Brachiosaurus (arm lizard)', 30.5],
                            ['Ceratosaurus (horned lizard)', 6.1],
                            ['Coelophysis (hollow form)', 2.7],
                            ['Compsognathus (elegant jaw)', 0.9],
                            ['Deinonychus (terrible claw)', 2.7],
                            ['Diplodocus (double beam)', 27.1],
                            ['Dromicelomimus (emu mimic)', 3.4],
                            ['Gallimimus (fowl mimic)', 5.5],
                            ['Mamenchisaurus (Mamenchi lizard)', 21.0],
                            ['Megalosaurus (big lizard)', 7.9],
                            ['Microvenator (small hunter)', 1.2],
                            ['Ornithomimus (bird mimic)', 4.6],
                            ['Oviraptor (egg robber)', 1.5],
                            ['Plateosaurus (flat lizard)', 7.9],
                            ['Sauronithoides (narrow-clawed lizard)', 2.0],
                            ['Seismosaurus (tremor lizard)', 45.7],
                            ['Spinosaurus (spiny lizard)', 12.2],
                            ['Supersaurus (super lizard)', 30.5],
                            ['Tyrannosaurus (tyrant lizard)', 15.2],
                            ['Ultrasaurus (ultra lizard)', 30.5],
                            ['Velociraptor (swift robber)', 1.8],
                        ]}
                        options={{
                            title: 'Order quantity by category',
                            legend: { position: 'none' },
                            colors: ['green'],
                            backgroundColor: '#1b1b1b',
                            titleTextStyle: {
                              color: '#fff'
                            }
                        }}
                        rootProps={{ 'data-testid': '1' }}
                        />
                    <Chart
                        width={'50%'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            [
                              { type: 'date', label: 'Day' },
                              'Average temperature',
                              'Average hours of daylight',
                            ],
                            [new Date(2014, 0), -0.5, 5.7],
                            [new Date(2014, 1), 0.4, 8.7],
                            [new Date(2014, 2), 0.5, 12],
                            [new Date(2014, 3), 2.9, 15.3],
                            [new Date(2014, 4), 6.3, 18.6],
                            [new Date(2014, 5), 9, 20.9],
                            [new Date(2014, 6), 10.6, 19.8],
                            [new Date(2014, 7), 10.3, 16.6],
                            [new Date(2014, 8), 7.4, 13.3],
                            [new Date(2014, 9), 4.4, 9.9],
                            [new Date(2014, 10), 1.1, 6.6],
                            [new Date(2014, 11), -0.2, 4.5],
                        ]}
                        options={{
                            axes: {
                                // Adds labels to each axis; they don't have to match the axis names.
                                y: {
                                    Temps: { label: 'Temps (Celsius)' },
                                    Daylight: { label: 'Daylight' },
                                },
                            },
                            series: {
                                // Gives each series an axis name that matches the Y-axis below.
                                0: { axis: 'Temps' },
                                1: { axis: 'Daylight' },
                            },
                            chart: {
                              title: 'Evolution of sales by category'
                            },
                            backgroundColor: '#1b1b1b',
                            titleTextStyle: {
                              color: '#fff'
                            },
                            legend: {
                                color: '#fff'
                            }
                        }}
                        rootProps={{ 'data-testid': '1' }}
                      />
                    <Chart
                        width={'50%'}
                        chartType="ScatterChart"
                        loader={<div>Loading Chart</div>}
                        data={[['Generation', 'Descendants'], [0, 1], [1, 33], [2, 269], [3, 2013]]}
                        options={{
                            title: 'Sales trending',
                            hAxis: { title: 'Generation', minValue: 0, maxValue: 3 },
                            vAxis: { title: 'Descendants', minValue: 0, maxValue: 2100 },
                            trendlines: {
                                0: {
                                type: 'exponential',
                                visibleInLegend: true,
                                },
                            },
                            backgroundColor: '#1b1b1b',
                            titleTextStyle: {
                                color: '#fff'
                            }
                        }}
                        rootProps={{ 'data-testid': '2' }}
                    />
                    <Chart
                        width={'50%'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Task', 'Hours per Day'],
                            ['Work', 11],
                            ['Eat', 2],
                            ['Commute', 2],
                            ['Watch TV', 2],
                            ['Sleep', 7],
                        ]}
                        options={{
                            title: 'My Daily Activities',
                            // Just add this option
                            is3D: true,
                        }}
                        rootProps={{ 'data-testid': '2' }}
                        />
                </div>
            </>
        )
    }
}
