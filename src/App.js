import React from 'react';
import axios from 'axios';
import CityForm from './CityForm'
import City from './City';
import Weather from './Weather'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityNameInput: '',
      cityData: [],
      weatherData: [],
      error: false,
      errorMessage: '',
    }
  }

citySubmit = async (cityNameInput) => {
  console.log(this.state.cityNameInput);
  console.log(process.env.REACT_APP_LOCATIONIQ_API_KEY);
  let state;
  //let weatherData;

  let url=`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${cityNameInput}&format=json`;
  //console.log(url);

  //let weatherUrl=`${process.env.REACT_APP_LOCALURL}/weather?search=${cityNameInput}`;
  //console.log(weatherUrl);
  try{
    state = await axios.get(url);
    //weatherData = await axios.get(weatherUrl);
    //console.log(state.data[0]);
    this.setState({
      cityData: state.data[0],
      //eatherData: weatherData.data
    }, this.weatherSubmit);
  } catch (error) {
    console.log('error: ', error);
    console.log('error.message: ', error.message);
    this.setState({
      error: true,
      errorMessage: `An Error Occured: ${error.response.status}`
    })
  }
  console.log(this.state.cityData);
  
}

weatherSubmit = async () => {
  let weatherUrl=`${process.env.REACT_APP_LOCALURL}/weather?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`;
  console.log(this.state.cityData.lon);
  let weatherData;
  try{
    weatherData = await axios.get(weatherUrl);
    this.setState({
      weatherData: weatherData.data
    })
  } catch (error) {
    console.log('error: ', error);
    console.log('error.message: ', error.message);
    this.setState({
      error: true,
      errorMessage: `An Error Occured: ${error.response.status}`
    })
  }
  console.log(weatherUrl);
}

  render() {
    let cityName = this.state.cityData.display_name;
    let lat = this.state.cityData.lat;
    let long = this.state.cityData.lon;
    let cityCoordinates = 'latitude: '+lat+', longitude: '+long;

    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${long}&zoom=12`;

    console.log(this.state.weatherData.description);

    let threeDayWeather = this.state.weatherData.map(day => {
      return(
        <Weather
          date={day.date}
          description={day.description}
        />
      )
    })

    return (
      <>
        <header>
          <h1>Data from API</h1>
        </header>
        <main>
          <CityForm
            citySubmit={this.citySubmit}
            handleCityInput={this.handleCityInput}
            cityName={cityName}
            cityCoordinates={cityCoordinates}
            mapURL={mapURL}
            />
          
          {this.state.error
          ?
          <p>{this.state.errorMessage}</p>
          :
            (cityName===undefined
              ?
            <p/>
            :
            <>
              <City
                cityName={cityName}
                cityCoordinates={cityCoordinates}
                mapURL={mapURL}
              />
              <div>
                {threeDayWeather}
              </div>
            </>
            )
          }
        </main>
        <footer></footer>
      </>
    );
  }


}

export default App;
