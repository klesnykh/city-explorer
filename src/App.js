import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: [],
      error: false,
      errorMessage: ''
    }
  }

citySubmit = async (event) => {
  event.preventDefault();
  console.log(this.state.cityName);
  console.log(process.env.REACT_APP_LOCATIONIQ_API_KEY);
  let state;
  let url=`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;
  console.log(url);
  try{
    state = await axios.get(url);
    console.log(state);
    this.setState({
      cityData: state.data[0]
    });
  } catch (error) {
    console.log('error: ', error);
    console.log('error.message: ', error.message);
    this.setState({
      error: true,
      errorMessage: `An Error Occured: ${error.response.status}`
    })
  }
}

handleCityInput = (event) => {
  this.setState({
    cityName: event.target.value
  });
}


  render() {
    let cityName = this.state.cityData.display_name;
    let lat = this.state.cityData.lat;
    let long = this.state.cityData.lon;
    let cityCoordinates = 'latitude: '+lat+', longitude: '+long;

    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${long}&zoom=12`;

    return (
      <>
        <header>
          <h1>Data from API</h1>
        </header>
        <main>
          <form onSubmit={this.citySubmit}>
            <label>Pick a City
              <input type="text" onChange={this.handleCityInput}/>
            </label>
            <button type="submit">Explore!</button>
          </form>
          {this.state.error
          ?
          <p>{this.state.errorMessage}</p>
          :
          <ul>
            <li>{cityName}</li>
            <li>{cityCoordinates}</li>
            <li><img src={mapURL} alt={cityName}/></li>
          </ul>
        }
        </main>
        <footer></footer>
      </>
    );
  }


}

export default App;
