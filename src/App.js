import React, { Component } from 'react';
import './App.css';
import xhr from 'xhr';

class App extends Component {
  state = {
    location: '',
    data: {}
  }
  fetchData = (e) => {
    e.preventDefault();
    var location = encodeURIComponent(this.state.location);
    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=fde36a5fa2186bc5183c7f0e99b50ecc&units=metric';
    var url = urlPrefix + location + urlSuffix

    var self = this;
    xhr({
      url: url
    }, function(err, data){
      self.setState({
        data: JSON.parse(data.body)
      })
    })
  }

  changeLocation = (props) => {
    this.setState({
      location: props.target.value
    })
  }
  render() {
    var currentTemp = '-';
    if(this.state.data.list) {
      currentTemp= this.state.data.list[0].main.temp;
    }
    return (
      <div className="card">
        <h1>Weather!</h1>
        <hr />
        <br />
        <div className="card-body">
          <form onSubmit={this.fetchData}>
            <label> I want to know the weather for <input placeholder={"City, Country"}
                                                          type="text"
                                                          value={this.state.location} 
                                                          onChange={this.changeLocation} />
            </label>
          </form>
          <p>
            <span>{ currentTemp } </span>
            <span>&deg;C</span> 
          </p>
        </div>
      </div>

    );
  }
}
// fde36a5fa2186bc5183c7f0e99b50ecc
// http://api.openweathermap.org/data/2.5/forecast?q=Vienna,Austria&APPID=fde36a5fa2186bc5183c7f0e99b50ecc&units=metric
export default App;
