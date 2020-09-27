import React, { Component } from 'react'
import { Chart } from "react-google-charts"
import Axios from 'axios'
import {API_URL} from '../../constants';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'turnover',
      warehouses: [],
      turnover: []
    }

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentDidMount() {
    Axios.get('http://' + API_URL + '/api/global_income').then((response) => {
      this.setState({turnover: response.data});
    });
    Axios.get('http://' + API_URL + '/api/warehouses').then((response) => {
      this.setState({warehouses: response.data});
    });
  }

  onFilterChange(event) {
    this.setState({filter: event.target.value});
  }

  render() {

    let data = [['Location', 'Global Income']];
    let options = {};
    
    if (this.state.filter === 'turnover') {
      data = [['Location', 'Global Income'], ...this.state.turnover];
    } else if (this.state.filter === 'warehouses') {
      data = [['Location', 'Name'], ...this.state.warehouses.map((w) => [w.location.city,w.name])];
      options = { displayMode: "markers" };
    }

    return (
      <div style={{textAlign: 'right'}}>
        <h1 style={{textAlign: 'center'}}>Lug Dynamics</h1>
        <select style={{marginRight: '1em'}} value={this.state.filter} onChange={this.onFilterChange}>
          <option value="turnover">Global Income</option>
          <option value="warehouses">Warehouses</option>
        </select>
        <Chart
          width={'85%'}
          style={{margin: '0 auto'}}
          chartType="GeoChart"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            colorAxis: {minValue: 0, colors: ['#ff8a80', '#d50000']},
            backgroundColor: '#1b1b1b',
            datalessRegionColor: '#6d6d6d',
            defaultColor: '#d50000',
            enableRegionInteractivity: true,
            ...options
          }}
          mapsApiKey="AIzaSyCO5l9hTuAV_lAdZImI22bC_oxYcosDgqI"
          chartEvents={[
            {
              eventName: "ready",
              callback: ({ chartWrapper, google }) => {
                const chart = chartWrapper.getChart();
                google.visualization.events.addListener(chart, "regionClick", e => {
                  window.location = "/country/" + e.region;
                });
              }
            }
          ]}
          />
      </div>
    )
  }
}
