import React from 'react';
import axios from 'axios';
import CityForm from './CityForm'
import City from './City';
import Weather from './Weather'
import Movie from './Movie'
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import './App.css'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityNameInput: '',
      cityData: [],
      weatherData: [],
      movieData: [],
      error: false,
      errorMessage: '',
    }
  }

citySubmit = async (cityNNName) => {
  console.log(this.state.cityName);
  console.log(process.env.REACT_APP_LOCATIONIQ_API_KEY);
  let state;
  //let weatherData;

  let url=`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${cityNNName}&format=json`;
  //console.log(url);

  //let weatherUrl=`${process.env.REACT_APP_LOCALURL}/weather?search=${cityNameInput}`;
  //console.log(weatherUrl);
  try{
    state = await axios.get(url);
    //weatherData = await axios.get(weatherUrl);
    //console.log(state.data[0]);
    this.setState({
      cityNameInput: cityNNName,
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
  this.movieSubmit();
  let weatherUrl=`${process.env.REACT_APP_LOCALURL}/weather?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`;
  console.log(this.state.cityData.lon);
  let weatherDDData;
  try{
    weatherDDData = await axios.get(weatherUrl);
    this.setState({
      weatherData: weatherDDData.data
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

movieSubmit = async () => {

  let movieUrl = `${process.env.REACT_APP_LOCALURL}/movies?search=${this.state.cityNameInput}`;
  let movieDDData;
  try{
    movieDDData = await axios.get(movieUrl);
    this.setState({
      movieData: movieDDData.data
    })
  } catch (error) {
    console.log('error: ', error);
    console.log('error.message: ', error.message);
    this.setState({
      error: true,
      errorMessage: `An Error Occured: ${error.response.status}`
    })
  }

}

  render() {
    let cityName = this.state.cityData.display_name;
    let lat = this.state.cityData.lat;
    let long = this.state.cityData.lon;
    let cityCoordinates = 'latitude: '+lat+', longitude: '+long;

    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${long}&zoom=12`;

    //console.log(this.state.weatherData.description);

    let threeDayWeather = this.state.weatherData.map(day => {
      return(
        <Weather
          date={day.date}
          description={day.description}
        />
      )
    })

    let movies = this.state.movieData.map(movie => {
      console.log(movie.img_url);
      return(
        <Movie
          title = {movie.title}
          overview = {movie.overview}
          average_votes = {movie.average_votes}
          total_votes = {movie.total_votes}
          img_url = {movie.img_url}
          popularity = {movie.popularity}
          released_on = {movie.released_on}
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
              <div>Three Day Weather
                {threeDayWeather}
              </div>
              <h2>Movies From {this.state.cityNameInput} from 2020</h2>
              <Row>
                {movies}
              </Row>
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
